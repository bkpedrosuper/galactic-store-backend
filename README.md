# galactic-store-backend
Typescript application to simulate a simple e-commerce, listing products and costumers

## The app can be found online hosted by Heroku at: [Link to APP] (https://galactic-store.herokuapp.com/)

## The entitys were based on the following model: 

Galactic Store Model: 
![Model](https://drive.google.com/file/d/1Fv8QHpDl5dnbyGjJAyV1dXKxZ0wx9Dky/view?usp=sharing "Flow-Char Galactic Store")

## Running the application

At first, you must update every dependencies this project might have.

```
$ npm run install
```

Then, with NodeJS installed, you can run

```
$ npm run dev
```

The app now can be acessed at #### http://localhost:3300



## Documentation

baseURL: https://galactic-store-frontend.vercel.app

### Costumer
#### route: baseURL/costumer

#### model:
```javascript
@Entity("costumers")
class Costumer {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    imageSrc: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}
```

##### POST Example
```json
{
	"name": "Han Solo",
	"email": "solohan@badguys.com",
	"imageSrc": "https://conteudo.imguol.com.br/c/entretenimento/c9/2018/02/02/harrison-ford-como-han-solo-1517599837310_v2_1180x842.jpg"
}
```

##### GET
```json
<no-body>
```
