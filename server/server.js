const express = require('express');
const path = require('path');
const compression = require('compression');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

//
// app.route('/api/invoices/:invoice_id/items/:id')
//     .get(function(req, res) {
//       InvoiceItem.findById(req.params.id).then(function(invoice_item) {
//         res.json(invoice_item);
//       });
//     })
//     .put(function(req, res) {
//       InvoiceItem.findById(req.params.id).then(function(invoice_item) {
//         invoice_item.update(_.pick(req.body, ['product_id', 'quantity'])).then(function(invoice_item) {
//           res.json(invoice_item);
//         });
//       });
//     })
//     .delete(function(req, res) {
//       InvoiceItem.findById(req.params.id).then(function(invoice_item) {
//         invoice_item.destroy().then(function(invoice_item) {
//           res.json(invoice_item);
//         });
//       });
//     });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening on ${ PORT }`)
});

