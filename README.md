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

baseURL: https://galactic-store.herokuapp.com

### Costumer
#### route: baseURL/costumers

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

}
```

##### POST Example
```json
{
	"name": "Han Solo",
	"email": "solohan@badguys.com",
	"imageSrc": "images_example/costumer.png"
}
```

##### GET
```json
<no-body>
```

### Product
#### route: baseURL/products

#### model:
```javascript
@Entity("products")
class Product {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    imageSrc: string;

    @Column()
    multiple: number;

    @CreateDateColumn()
    created_at: Date;

}
```

##### POST Example
```json
{
	"name": "DLT-19 Heavy Blaster Rifle",
	"price": 5800,
	"imageSrc": "images_example/product.png",
	"multiple": 2
}

```

##### GET
```json
<no-body>
```

### Purchase
#### route: baseURL/purchases

#### model:
```javascript
@Entity("purchases")
class Purchase {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    costumer_id: string;

    @ManyToOne(() => Costumer )
    @JoinColumn({name: "costumer_id"})
    costumer: Costumer;

    @OneToMany(() => PurchasedProduct, purchasedProduct => purchasedProduct.purchase)
    products: PurchasedProduct[];

    @CreateDateColumn()
    created_at: Date;
}
```

##### POST Example
```json
{
	"costumer_id": "73eb673a-4940-4f40-ad61-3dae2ab86d98",
	"products_selected": [
		{
			"product_id": "db5ba031-36c1-4f0f-ad0b-5a71635436e8",
			"quantity": 8,
			"price": 34
		},
		{
			"product_id": "abc39815-fa35-4183-b580-5c558e5a68b8",
			"quantity": 3,
			"price": 45
		}
	]
}

```

##### GET
```json
<no-body>
```
