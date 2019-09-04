import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();
//Provider
class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
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
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct: product};
        });
    }

    addToCart = id => {
        console.log(`hello from add to cart. The id is ${id}`);
    }

    render() {
        return (
            <div>
                <ProductContext.Provider value={{
                    ...this.state, //gets all the properties from objects listed in state
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
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