/** Pop Frost preorder receiver. No payments or automatic customer emails. */
const TAB = 'Preorders';
const COLUMNS = ['Created','Order ID','Name','Email','Phone','Collection','Dozens','Cookies','Requested Date','Message','Notes','Artwork Drive URL','Estimated USD','Status'];
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(TAB) || ss.insertSheet(TAB);
  if (sh.getLastRow() === 0) sh.appendRow(COLUMNS);
  sh.setFrozenRows(1);
  const props = PropertiesService.getScriptProperties();
  props.setProperty('SHEET_ID', ss.getId());
  if (!props.getProperty('FOLDER_ID')) {
    props.setProperty('FOLDER_ID', DriveApp.createFolder('Pop Frost - Private Customer Artwork').getId());
  }
  console.log('Preorder receiver ready. Sheet and artwork remain private.');
}
function doPost(e) {
  try {
    const p = e && e.parameter || {};
    const name = String(p.name || '').trim().slice(0,100);
    const email = String(p.email || '').trim().slice(0,180);
    const due = String(p.due || '').slice(0,10);
    const qty = Number(p.dozens);
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{4}-\d{2}-\d{2}$/.test(due) || ![1,2,3,5,10].includes(qty)) throw Error('Invalid order');
    const lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      const props = PropertiesService.getScriptProperties();
      const sh = SpreadsheetApp.openById(props.getProperty('SHEET_ID')).getSheetByName(TAB);
      const id = 'PF-' + Utilities.formatDate(new Date(),'America/Chicago','yyyyMMdd-HHmmss') + '-' + Utilities.getUuid().slice(0,8);
      let link = '';
      const photo = String(p.photoData || '');
      if (photo) {
        const match = photo.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/);
        if (!match || photo.length > 3000000) throw Error('Invalid artwork');
        const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
        const blob = Utilities.newBlob(Utilities.base64Decode(match[2]),'image/' + match[1],id + '.' + ext);
        link = DriveApp.getFolderById(props.getProperty('FOLDER_ID')).createFile(blob).getUrl();
      }
      const safe = s => { const v = String(s || '').slice(0,1500); return /^[\s]*[=+@\-]/.test(v) ? "'" + v : v; };
      sh.appendRow([new Date(),id,safe(name),safe(email),safe(p.phone),safe(p.kind),qty,qty*12,due,safe(p.message),safe(p.notes),link,Math.round(qty*55.00*100)/100,'New']);
      return HtmlService.createHtmlOutput('<h2>Request received</h2><p>Reference: ' + id + '</p><p>Pop Frost will contact you to confirm availability and pricing. No payment was collected.</p>');
    } finally { lock.releaseLock(); }
  } catch (err) {
    console.error(String(err));
    return HtmlService.createHtmlOutput('<h2>Request could not be processed</h2><p>Please contact popfrost@purelymail.com before trying again.</p>');
  }
}
