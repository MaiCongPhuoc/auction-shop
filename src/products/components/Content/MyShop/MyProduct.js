import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FormatMoney } from "../../../Hooks/Hooks";
import { useSelector } from "react-redux";
import { getOpenSidebar } from "../../../redux/selector";
import LoadCart from "../../Loading/LoadCart";
import EmptyOrder from "../../Loading/EmptyOrder";
import ProductService from "../../../service/Product/ProductService";
import { toast } from 'react-toastify';

function MyProduct({ account }) {
    const openSidebar = useSelector(getOpenSidebar);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        try {
            ProductService.getProductsModeratedByCreatedBy(account.email).then((res) => {
                if (res.data.length > 0) {
                    setProducts(res.data);
                } else {
                    toast.warn(res.data.message);
                }
            }).catch((resp) => {
                toast.warn(resp.data.message);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        if (openSidebar) {
            document.querySelector('.moderation-list').style.marginLeft = '300px';
            document.querySelector('.non-moderation-list').style.marginLeft = '300px';
            document.querySelector('.moderation-item').style.marginLeft = '300px';
            document.querySelector('.non-moderation-item').style.marginLeft = '300px';
        }
        else {
            document.querySelector('.moderation-list').style.marginLeft = '80px';
            document.querySelector('.non-moderation-list').style.marginLeft = '80px';
            document.querySelector('.moderation-item').style.marginLeft = '80px';
            document.querySelector('.non-moderation-item').style.marginLeft = '80px';
        }
    }, [openSidebar]);

    const moderationList = (products) => {
        return products.filter((product) => {
            return product.moderation === true;
        });
    };
    const nonModerationList = (products) => {
        return products.filter((product) => {
            return product.moderation === false;
        });
    };

    let moderatedList = moderationList(products);
    let nonModeratedList = nonModerationList(products);

    return (
        <>
            <div className="moderation-list" style={{ display: 'flex' }}>
                <h2>???? ki???m duy???t &gt;&gt;</h2>
                <div className="ms-5"><b>{moderatedList.length}</b> s???n ph???m</div>
            </div>
            <div className="moderation-item lot-cards grid-x mt-3">
                {moderatedList.length > 0 ?
                    moderatedList.map(product => (
                        <div key={product.id} className="card small-12 medium-6 cell" style={{ transform: 'none' }}
                        // onClick={() => handleShowInfoProduct(product)}
                        >
                            {
                                product.action ? (
                                    <Link to={`/auction/${product.id}`} style={{ color: '#333' }}>
                                        <figure className="card__image">
                                            <img src={product.image} alt="" style={{ transform: 'none' }} />
                                        </figure>
                                        <div className="card__info-container">
                                            <div className="info-container__label">
                                                <span className="ico-circle c-bid">
                                                    {/* <i class="fa-solid fa-tag"></i> */}
                                                    <i className="fas fa-gavel"></i>
                                                </span>
                                                <span className="label__main"> ?????u gi?? </span>
                                            </div>
                                            <h3 className="card__title">
                                                <span>{product.title}</span>
                                            </h3>
                                            <div className="card__meta-group" />
                                            <div className="card__stats-group">
                                                <div className="stats-group__stat">
                                                    <b>??ang tham gia:</b> 5
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Theo d??i:</b> 34
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Gi?? ?????c t??nh:</b> {FormatMoney(product.estimatePrice)} ???
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Gi?? kh???i ??i???m:</b>
                                                    <div className="stat__price">{FormatMoney(product.price)} ???</div>
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Gi?? hi???n t???i:</b>
                                                    <div className="stat__price">{FormatMoney(product.price)} ???</div>
                                                </div>
                                            </div>
                                            <div className="card__tertiary-container">
                                                <span className="tertiary-container__optional-group" />
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link to={`/product/the-shop/${product.slug}`} style={{ color: '#333' }}>
                                        <figure className="card__image">
                                            <img src={product.image} alt="" style={{ transform: 'none' }} />
                                        </figure>
                                        <div className="card__info-container">
                                            <div className="info-container__label">
                                                <span className="ico-circle c-bin">
                                                    <i className="fas fa-tag"></i>
                                                </span>
                                                <span className="label__main"> C???a h??ng </span>
                                            </div>
                                            <h3 className="card__title">
                                                <span>{product.title}</span>
                                            </h3>
                                            <div className="card__stats-group">
                                                <div className="stats-group__stat">
                                                    <b>S??? l?????ng c??n l???i:</b> {product.available}
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Gi?? s???n ph???m:</b>
                                                    <div className="stat__price ItemCard-module__binPriceCentered___3hyVZ">
                                                        {FormatMoney(product.price)} ???
                                                    </div>
                                                </div>
                                                <div className="ItemCard-module__marketPrice___3E7JK">
                                                    <b>???? b??n: </b>
                                                    <span className="ItemCard-module__lineThrough___3xq25">{product.sold}</span>
                                                </div>
                                            </div>
                                            <div className="card__tertiary-container">
                                                <span className="tertiary-container__optional-group" />
                                            </div>
                                        </div>
                                    </Link>
                                )}

                        </div>
                    )) : <EmptyOrder />
                }
            </div>
            <div className="non-moderation-list" style={{ marginTop: '50px', display: 'flex' }}>
                <h2>??ang ch??? ki???m duy???t &gt;&gt;</h2>
                <div className="ms-5"><b>{nonModeratedList.length}</b> s???n ph???m</div>
            </div>
            <div className="non-moderation-item lot-cards grid-x mt-3">
                {nonModeratedList.length > 0 ?
                    nonModeratedList.map(product => (
                        <div key={product.id} className="card small-12 medium-6 cell" style={{ transform: 'none' }}
                        // onClick={() => handleShowInfoProduct(product)}
                        >
                            {
                                product.action ? (
                                    <Link to={`/auction/${product.id}`} style={{ color: '#333' }}>
                                        <figure className="card__image">
                                            <img src={product.image} alt="" style={{ transform: 'none' }} />
                                        </figure>
                                        <div className="card__info-container">
                                            <div className="info-container__label">
                                                <span className="ico-circle c-bid">
                                                    {/* <i class="fa-solid fa-tag"></i> */}
                                                    <i className="fas fa-gavel"></i>
                                                </span>
                                                <span className="label__main"> ?????u gi?? </span>
                                            </div>
                                            <h3 className="card__title">
                                                <span>{product.title}</span>
                                            </h3>
                                            <div className="card__meta-group" />
                                            <div className="card__stats-group">
                                                <div className="stats-group__stat">
                                                    <b>??ang tham gia:</b> 5
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Theo d??i:</b> 34
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Gi?? ?????c t??nh:</b> {FormatMoney(product.estimatePrice)} ???
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Gi?? kh???i ??i???m:</b>
                                                    <div className="stat__price">{FormatMoney(product.price)} ???</div>
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Gi?? hi???n t???i:</b>
                                                    <div className="stat__price">{FormatMoney(product.price)} ???</div>
                                                </div>
                                            </div>
                                            <div className="card__tertiary-container">
                                                <span className="tertiary-container__optional-group" />
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link to={`/product/the-shop/${product.slug}`} style={{ color: '#333' }}>
                                        <figure className="card__image">
                                            <img src={product.image} alt="" style={{ transform: 'none' }} />
                                        </figure>
                                        <div className="card__info-container">
                                            <div className="info-container__label">
                                                <span className="ico-circle c-bin">
                                                    <i className="fas fa-tag"></i>
                                                </span>
                                                <span className="label__main"> C???a h??ng </span>
                                            </div>
                                            <h3 className="card__title">
                                                <span>{product.title}</span>
                                            </h3>
                                            <div className="card__stats-group">
                                                <div className="stats-group__stat">
                                                    <b>S??? l?????ng c??n l???i:</b> {product.available}
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Gi?? s???n ph???m:</b>
                                                    <div className="stat__price ItemCard-module__binPriceCentered___3hyVZ">
                                                        {FormatMoney(product.price)} ???
                                                    </div>
                                                </div>
                                                <div className="ItemCard-module__marketPrice___3E7JK">
                                                    <b>???? b??n: </b>
                                                    <span className="ItemCard-module__lineThrough___3xq25">{product.sold}</span>
                                                </div>
                                            </div>
                                            <div className="card__tertiary-container">
                                                <span className="tertiary-container__optional-group" />
                                            </div>
                                        </div>
                                    </Link>
                                )}

                        </div>
                    )) : <EmptyOrder />
                }
            </div>
        </>
    );
}

export default MyProduct;