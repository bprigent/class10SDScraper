import React from "react";
import './Product.css';

export function Product ({obj}) {
    const productName = obj['name'];
    const productImage = obj['image'];
    
    let productPrice = 'price not found';
    if (obj && obj['offers'] && Array.isArray(obj['offers']) && obj['offers'].length > 0) {
        productPrice = obj['offers'][0]['price'] || 'price not found';
    };

    let isAvailable = 'No';
    if (
        obj &&
        obj['offers'] &&
        Array.isArray(obj['offers']) &&
        obj['offers'].length > 0 &&
        obj['offers'][0]['availability'] === 'http://schema.org/InStock'
    ) {
        isAvailable = 'Yes';
    }

    function formatPriceInDollars(number) {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        return formatter.format(number);
      }

    return (
        <div className="SdPreview-card-parent_w">

            <div className="SdPreview-card-type_tag_w">
                <p className="SdPreview-card-type_tag_text">Type: Product</p>
            </div>

            <img className="SdPreview-card-product_image" src={productImage}/>

            <div className="SdPreview-card-classic_data_field_w">
                <span className="SdPreview-card-classic_data_field-sub_title">Product name</span>
                <span className="SdPreview-card-classic_data_field-main_title">{productName}</span>
            </div>

            <div className="SdPreview-card-classic_data_field_w">
                <span className="SdPreview-card-classic_data_field-sub_title">Price</span>
                <span className="SdPreview-card-classic_data_field-main_title">{formatPriceInDollars(productPrice)}</span>
            </div>

            <div className="SdPreview-card-classic_data_field_w">
                <span className="SdPreview-card-classic_data_field-sub_title">In stock?</span>
                <span className="SdPreview-card-classic_data_field-main_title">{isAvailable}</span>
            </div>
        </div>
    );
};