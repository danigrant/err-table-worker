# err-table-worker
cloudflare worker that logs http errors to airtable

![err-table](https://dani.nyc3.digitaloceanspaces.com/err-table-small.png)

## prerequisite
you need the application to already be behind cloudflare

## create the airtable
create a table in airtable where you will log all non-200 http status codes. a good name for this table is err-table.

## create the worker
copy the file from worker.js into a workers script, replace the airtable url and api key with your own ([find them here](https://airtable.com/api)) and then deploy the worker by creating a route in workers that triggers the worker on a given url pattern

## optional - use IFTTT to send you a text every time there's an error

![ifttt](https://dani.nyc3.digitaloceanspaces.com/err-table-ifttt-small.png)
