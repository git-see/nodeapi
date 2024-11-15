const express =require('express');
const app = express();

//routes since Client to Node APP
app.get('/', (req, res) => {
    res.send('Hello nodeapi')
})

app.listen(3000, () => {
    console.log('nodeapi app is running on port 3000')
}
)