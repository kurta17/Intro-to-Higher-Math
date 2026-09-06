/* ============================================================
   slides.html -> .pptx, with no dependencies.

   A .pptx is a zip of OOXML. We emit the smallest tree PowerPoint
   and Keynote both accept: one 16:9 slide per rendered PNG, the
   picture stretched full-bleed, and the deck's <div class="notes">
   carried across as real speaker notes.

   Rendering stays with Chrome (driver.mjs shot), so the PPTX is
   pixel-identical to the deck - KaTeX and Manrope included, with
   no font or maths dependency on the machine that opens it.
   ============================================================ */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const EMU_W = 12192000, EMU_H = 6858000;        // 13.333in x 7.5in @ 914400 EMU/in
const xml = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const DECL = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
const NS_P = 'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" ' +
             'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ' +
             'xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"';
const REL = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
const DOC = 'http://schemas.openxmlformats.org/drawingml/2006';

/** Pull one plain-text speaker-notes string per slide out of the deck source. */
export function extractNotes(html) {
  const body = html.replace(/<!--[\s\S]*?-->/g, '');
  const out = [];
  for (const sec of body.split(/<section class="slide/).slice(1)) {
    const m = sec.match(/<div class="notes"[^>]*>([\s\S]*?)<\/div>/);
    out.push(m ? decode(m[1]) : '');
  }
  return out;
}
function decode(s) {
  return s.replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ').trim();
}

const theme = name => DECL +
`<a:theme xmlns:a="${DOC}/main" name="${name}"><a:themeElements>
<a:clrScheme name="HS"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>
<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>
<a:dk2><a:srgbClr val="1B1B1B"/></a:dk2><a:lt2><a:srgbClr val="F5F5F5"/></a:lt2>
<a:accent1><a:srgbClr val="4B2696"/></a:accent1><a:accent2><a:srgbClr val="FF3BC7"/></a:accent2>
<a:accent3><a:srgbClr val="7A47EA"/></a:accent3><a:accent4><a:srgbClr val="00A3C4"/></a:accent4>
<a:accent5><a:srgbClr val="0F9D58"/></a:accent5><a:accent6><a:srgbClr val="D93025"/></a:accent6>
<a:hlink><a:srgbClr val="4B2696"/></a:hlink><a:folHlink><a:srgbClr val="7A47EA"/></a:folHlink></a:clrScheme>
<a:fontScheme name="HS"><a:majorFont><a:latin typeface="Manrope"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont>
<a:minorFont><a:latin typeface="Manrope"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme>
<a:fmtScheme name="HS">
<a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst>
<a:lnStyleLst><a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="12700"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="19050"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst>
<a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>
<a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst>
</a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>`;

const EMPTY_TREE =
`<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>`;

export function buildPptx({ pngs, notes, out, title = 'Deck', tmp }) {
  const n = pngs.length;
  if (!n) throw new Error('no slide images to package');
  rmSync(tmp, { recursive: true, force: true });
  const D = (...p) => { const d = join(tmp, ...p); mkdirSync(d, { recursive: true }); return d; };
  const W = (rel, body) => writeFileSync(join(tmp, rel), body);
  D(); D('_rels'); D('ppt', '_rels'); D('ppt', 'slides', '_rels'); D('ppt', 'notesSlides', '_rels');
  D('ppt', 'slideMasters', '_rels'); D('ppt', 'slideLayouts', '_rels');
  D('ppt', 'notesMasters', '_rels'); D('ppt', 'theme'); D('ppt', 'media');

  const ids = pngs.map((_, i) => i + 1);

  W('[Content_Types].xml', DECL +
`<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Default Extension="png" ContentType="image/png"/>
<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
<Override PartName="/ppt/notesMasters/notesMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesMaster+xml"/>
<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
<Override PartName="/ppt/theme/theme2.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
${ids.map(i => `<Override PartName="/ppt/slides/slide${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join('\n')}
${ids.map(i => `<Override PartName="/ppt/notesSlides/notesSlide${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml"/>`).join('\n')}
</Types>`);

  W('_rels/.rels', DECL +
`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="${REL}/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>`);

  // slide rIds start after the master (rId1) and notesMaster (rId2)
  W('ppt/presentation.xml', DECL +
`<p:presentation ${NS_P} saveSubsetFonts="1">
<p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>
<p:notesMasterIdLst><p:notesMasterId r:id="rId2"/></p:notesMasterIdLst>
<p:sldIdLst>${ids.map(i => `<p:sldId id="${255 + i}" r:id="rId${i + 2}"/>`).join('')}</p:sldIdLst>
<p:sldSz cx="${EMU_W}" cy="${EMU_H}"/><p:notesSz cx="${EMU_H}" cy="${EMU_W}"/>
</p:presentation>`);

  W('ppt/_rels/presentation.xml.rels', DECL +
`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="${REL}/slideMaster" Target="slideMasters/slideMaster1.xml"/>
<Relationship Id="rId2" Type="${REL}/notesMaster" Target="notesMasters/notesMaster1.xml"/>
${ids.map(i => `<Relationship Id="rId${i + 2}" Type="${REL}/slide" Target="slides/slide${i}.xml"/>`).join('\n')}
<Relationship Id="rId${n + 3}" Type="${REL}/theme" Target="theme/theme1.xml"/>
</Relationships>`);

  W('ppt/theme/theme1.xml', theme('HS deck'));
  W('ppt/theme/theme2.xml', theme('HS notes'));

  W('ppt/slideMasters/slideMaster1.xml', DECL +
`<p:sldMaster ${NS_P}><p:cSld><p:bg><p:bgPr><a:solidFill><a:schemeClr val="lt1"/></a:solidFill><a:effectLst/></p:bgPr></p:bg>
<p:spTree>${EMPTY_TREE}</p:spTree></p:cSld>
<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
<p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>
</p:sldMaster>`);
  W('ppt/slideMasters/_rels/slideMaster1.xml.rels', DECL +
`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="${REL}/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
<Relationship Id="rId2" Type="${REL}/theme" Target="../theme/theme1.xml"/>
</Relationships>`);

  W('ppt/slideLayouts/slideLayout1.xml', DECL +
`<p:sldLayout ${NS_P} type="blank" preserve="1"><p:cSld name="Blank">
<p:spTree>${EMPTY_TREE}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`);
  W('ppt/slideLayouts/_rels/slideLayout1.xml.rels', DECL +
`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="${REL}/slideMaster" Target="../slideMasters/slideMaster1.xml"/>
</Relationships>`);

  W('ppt/notesMasters/notesMaster1.xml', DECL +
`<p:notesMaster ${NS_P}><p:cSld><p:spTree>${EMPTY_TREE}
<p:sp><p:nvSpPr><p:cNvPr id="2" name="Notes Placeholder"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr>
<p:nvPr><p:ph type="body" idx="1"/></p:nvPr></p:nvSpPr>
<p:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${EMU_H}" cy="${EMU_W}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>
<p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp>
</p:spTree></p:cSld>
<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
</p:notesMaster>`);
  W('ppt/notesMasters/_rels/notesMaster1.xml.rels', DECL +
`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="${REL}/theme" Target="../theme/theme2.xml"/>
</Relationships>`);

  pngs.forEach((src, k) => {
    const i = k + 1;
    copyFileSync(src, join(tmp, 'ppt', 'media', `image${i}.png`));

    W(`ppt/slides/slide${i}.xml`, DECL +
`<p:sld ${NS_P}><p:cSld><p:spTree>${EMPTY_TREE}
<p:pic><p:nvPicPr><p:cNvPr id="2" name="Slide ${i}"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
<p:blipFill><a:blip r:embed="rId2"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
<p:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${EMU_W}" cy="${EMU_H}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>
</p:pic></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`);

    W(`ppt/slides/_rels/slide${i}.xml.rels`, DECL +
`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="${REL}/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
<Relationship Id="rId2" Type="${REL}/image" Target="../media/image${i}.png"/>
<Relationship Id="rId3" Type="${REL}/notesSlide" Target="../notesSlides/notesSlide${i}.xml"/>
</Relationships>`);

    const text = notes[k] || '';
    W(`ppt/notesSlides/notesSlide${i}.xml`, DECL +
`<p:notes ${NS_P}><p:cSld><p:spTree>${EMPTY_TREE}
<p:sp><p:nvSpPr><p:cNvPr id="2" name="Notes Placeholder ${i}"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr>
<p:nvPr><p:ph type="body" idx="1"/></p:nvPr></p:nvSpPr><p:spPr/>
<p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:r><a:rPr lang="en-US" dirty="0"/><a:t>${xml(text)}</a:t></a:r></a:p></p:txBody></p:sp>
</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:notes>`);

    W(`ppt/notesSlides/_rels/notesSlide${i}.xml.rels`, DECL +
`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="${REL}/notesMaster" Target="../notesMasters/notesMaster1.xml"/>
<Relationship Id="rId2" Type="${REL}/slide" Target="../slides/slide${i}.xml"/>
</Relationships>`);
  });

  if (existsSync(out)) rmSync(out);
  execFileSync('zip', ['-r', '-X', '-q', out, '[Content_Types].xml', '_rels', 'ppt'], { cwd: tmp });
  rmSync(tmp, { recursive: true, force: true });
  return out;
}
