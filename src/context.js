import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();
//Provider
class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
    }

    componentDidMount() {
        this.setProducts();
    }
    // copying the array elements to not being only references
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        })

        this.setState(() => {
            return { products: tempProducts }
        })

    }

    getItem = id => {
        const { products } = this.state;
        const product = products.find(item => item.id === id);
        return product;
    }

    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct: product};
        });
    }

    addToCart = id => {
        const { products, cart } = this.state;
        let tempProducts = [...products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(() => {
           return {products: tempProducts, cart: [...cart, product]};
        });
        /*
        Insert this chunk of code (( } HERE );)) for testing and check the current state which is being rendered.
        , () => {
            console.log(this.state);
        }
        */
    }

    openModal = id => {
        const product = this.getItem(id);
        this.setState(()=> {
            return {modalProduct: product, modalOpen: true}
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false}
        });
    }

    render() {
        return (
            <div>
                <ProductContext.Provider value={{
                    ...this.state, //gets all the properties from objects listed in state
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                }}
                >
                    {this.props.children}
                </ProductContext.Provider>
            </div>
        );
    }
}

//Consumer
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };