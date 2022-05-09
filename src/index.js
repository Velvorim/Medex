const express = require('express');
const fs = require('fs');


const app = express();

app.use(express.json());


const banco =__dirname + '/BancoJson.json';

app.post('/user', (request, response) => {
    const { name, celular, cep, produto, email } = request.body;
    
    const users = fs.readFileSync(banco, 'utf-8')
    
    let user = JSON.parse(users);

    const userDados = { name, celular, cep, produto, email };

    const userAlreadyExists = user.some(
        (userTest) => userTest.name === name
    );

    if(userAlreadyExists){
        return response.status(400).json({ error: "User already exists"}); 
    }

    user.push(userDados);

    console.log(user);
    fs.writeFile(banco, JSON.stringify(user, null, 2), function(err){
        if (err) throw err;
        console.log('Error on append');
      });


    return response.status(201).send();
});

app.get('/user', (request, response) => {
    
    const config = require(banco)

    return response.json(config);
});

app.listen(3333);