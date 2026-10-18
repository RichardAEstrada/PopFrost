/** Pop Frost preorder receiver — Google Apps Script, deploy as web app.
 * Setup: Create a new Google Sheet > Extensions > Apps Script > paste this file.
 * Run setup() once and grant access. Deploy > New deployment > Web app,
 * Execute as Me; Who has access Anyone. Copy /exec URL into index.html.
 * Never publish your Google Sheet or Google Drive folder.
 */
const TAB='Preorders';
const COLUMNS=['Created','Order ID','Name','Email','Phone','Collection','Dozens','Cookies','Requested Date','Message','Notes','Artwork Drive URL','Estimated USD','Status'];
function setup(){const ss=SpreadsheetApp.getActiveSpreadsheet();let sh=ss.getSheetByName(TAB)||ss.insertSheet(TAB);if(sh.getLastRow()===0)sh.appendRow(COLUMNS);sh.setFrozenRows(1);PropertiesService.getScriptProperties().setProperty('SHEET_ID',ss.getId());const folder=DriveApp.createFolder('Pop Frost - Private Customer Artwork');PropertiesService.getScriptProperties().setProperty('FOLDER_ID',folder.getId());}
function doPost(e){
 try{
 const p=e.parameter||{};const name=String(p.name||'').trim().slice(0,100),email=String(p.email||'').trim().slice(0,180);
 const due=String(p.due||'').slice(0,10),qty=Number(p.dozens);
 if(!name||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!/^\d{4}-\d{2}-\d{2}$/.test(due)||![1,2,3,5,10].includes(qty))throw Error('Invalid order');
 const lock=LockService.getScriptLock();lock.waitLock(15000);
 try{
 const props=PropertiesService.getScriptProperties(),ss=SpreadsheetApp.openById(props.getProperty('SHEET_ID')),sh=ss.getSheetByName(TAB);
 const id='PF-'+Utilities.formatDate(new Date(),Session.getScriptTimeZone(),'yyyyMMdd-HHmmss')+'-'+Math.floor(Math.random()*900+100);
 let link='';const photo=String(p.photoData||'');
 if(photo){const match=photo.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/);
 if(!match||photo.length>3000000)throw Error('Invalid artwork');
 const ext=match[1]==='jpeg'?'jpg':match[1],bytes=Utilities.base64Decode(match[2]);
 const blob=Utilities.newBlob(bytes,'image/'+match[1],id+'.'+ext);
 link=DriveApp.getFolderById(props.getProperty('FOLDER_ID')).createFile(blob).getUrl();}
 const safe=s=>{const v=String(s||'').slice(0,1500);return /^[=+@\-]/.test(v)?"'"+v:v};
 sh.appendRow([new Date(),id,safe(name),safe(email),safe(p.phone),safe(p.kind),qty,qty*12,due,safe(p.message),safe(p.notes),link,Math.round(qty*35.99*100)/100,'New']);
 // Optional owner notification; do not email customer until order is reviewed.
 MailApp.sendEmail(Session.getEffectiveUser().getEmail(),'New Pop Frost preorder '+id,'New preorder '+id+' from '+name+' ('+email+'). Review your private Pop Frost Google Sheet.');
 return HtmlService.createHtmlOutput('<h2>Request received</h2><p>Pop Frost will contact you to confirm availability and pricing. You may close this window.</p>');
 }finally{lock.releaseLock()}
 }catch(err){console.error(err);return HtmlService.createHtmlOutput('<p>Request could not be processed. Please contact Pop Frost.</p>')}
}
