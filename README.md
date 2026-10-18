# Pop Frost — free preorder launch

## What is included
- Responsive public storefront with live local cookie photo preview, quantity and date selection, and preorder request form.
- Google Apps Script order receiver. Requests go into your **private Google Sheet**. Uploaded artwork goes into a **private Google Drive folder**.
- Owner CRM: filter and update the Status column in Google Sheets (New, Confirmed, Baking, Printing, Packaging, Ready, Completed, Cancelled). Use the Sheets app on mobile.
- No online payment collection or customer account creation. Prices are estimates, and orders require manual confirmation.

## Setup (about 15–25 minutes)
1. Create a Google Sheet named **Pop Frost Orders** in your own Google account.
2. Choose **Extensions → Apps Script**. Replace the starter code with `Code.gs` from this package and save.
3. In the Apps Script editor, select function `setup` and click **Run** once. Approve the Google permissions. This creates a Preorders tab and private artwork folder.
4. Click **Deploy → New deployment → Web app**. Choose **Execute as: Me** and **Who has access: Anyone**. Deploy and copy the `/exec` URL.
5. In `index.html`, replace `PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with that URL.
6. Create a **separate public GitHub repository** named `popfrost`, upload `index.html`, and enable **Settings → Pages → Deploy from a branch → main / root**.
7. Place a test order using a non-sensitive test photo. Verify the Google Sheet row and private Drive file; test another order on a different device. Only share the link after tests pass.

## Important limitations
- Google Sheets is your private **owner dashboard/CRM** for the free launch; it is not a custom password-protected web dashboard. Google account login protects it. **Never make the Sheet public.**
- This is a **preorder request**, not a confirmed order. The website cannot check live capacity, payment, or inventory.
- The iframe-based form can indicate that a submission finished but cannot securely verify success. Always confirm the order exists in Sheets before promising fulfillment. The script does not send customer confirmations.
- Anyone with the public URL can submit; Google Apps Script offers limited abuse protection. Monitor the Sheet, add anti-spam controls before advertising widely, and keep customer images private.
- Avoid collecting children's names, birthdays, or other unnecessary personal information. Ask customers to upload only images they are authorized to use. Add your actual business contact, privacy notice, cancellation terms, pickup/delivery region, allergens, and required Texas cottage-food labeling before launch.
- Edible image artwork should be reviewed for rights and suitability. Orders require manual approval.
- Never commit secret API keys or customer records to GitHub.
