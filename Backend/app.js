const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/user'));
app.use('/api/slots', require('./routes/packingSlot'));
app.use('/api/records', require('./routes/packingRecord'));
app.use('/api/payments', require('./routes/payment'));

const PORT = 12345;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
