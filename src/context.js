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
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0,
    }

    componentDidMount() {
        this.setProducts();
    }
    // copying the array elements to not being only references
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
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
            return { detailProduct: product };
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
            return {
                products: tempProducts,
                cart: [...cart, product]
            };
        }, () => {
            this.addTotals();
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
        this.setState(() => {
            return { modalProduct: product, modalOpen: true }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        });
    }
    // CART METHODS
    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count++;
        product.total = product.count * product.price;

        this.setState(() => {
            return {
                cart: [...tempCart]
            };
        }, () => {
            this.addTotals();
        });
    }

    decrement = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count--;

        if(product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;
            this.setState(() => {
                return {
                    cart: [...tempCart]
                };
            }, () => {
                this.addTotals();
            });
        }
    }

    removeItem = id => {
        let tempProducts =  [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts],
            };
        }, () => {
            this.addTotals();
        });
    }

    clearCart = () => {
        this.setState(() => {
            return {
                cart: []
            };
        }, ()=> {
            this.setProducts();
            this.addTotals();
        });
    }

    addTotals = () => {
        let subtotal= 0;
        this.state.cart.map(item => subtotal += item.total)
        const tempTax = subtotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2))
        const total = subtotal + tax;
        this.setState(() => {
            return {
                cartSubtotal: subtotal,
                cartTax: tax,
                cartTotal:total,
            }
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
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart,
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