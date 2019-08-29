import React, { useState, memo } from 'react'

 const Form = (props) => {
    const [values, setValues] = useState({
        bid: "",
        item: 0
    });

    const handleOnChange = (event) => {
        const {name, value} = event.target
        setValues({...values, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.owner) {
            props.handleEndAuction(values.item)
        } else {
            props.handleBid(values.item, values.bid)
        }
    }

    const handleOnClick = (event) => {
        event.preventDefault();
        props.handleWithdrawBid()
    }

    return ( 
    <form onSubmit = { handleSubmit } >
        {
            props.owner ? 
            <div>
                <div className="row">
                    <div className="col-md-12 col-lg-9">
                        <div className="row">
                            <label className="col-lg-3"> Select Item </label> 
                            <select 
                                value = { values.item }
                                name = "item"
                                onChange = { handleOnChange }
                                className = 'form-control col-lg-9' 
                            >
                                <option value = "" > Select an Item </option> 
                                {props.items.map((item) => {
                                    return (!item.ended &&
                                        <option 
                                            key = { item.id }
                                            value = { item.id }
                                        >{ item.name }
                                        </option>
                                    )
                                })} 
                            </select> 
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-3 rm-padding">
                        <div className = "col-lg-12 rm-padding">
                            <button 
                                type = 'submit'
                                className = 'btn btn-primary'
                            >End Auction
                            </button>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-md-12 col-lg-9">
                        <div className="row">
                            <label className="col-lg-3"> Item Name </label> 
                            <input
                                className="form-control col-lg-9"
                                type = "text"
                                name = "itemName"
                                placeholder = "Item Name"
                                value = { values.itemName }
                                onChange = { handleOnChange }
                            /> 
                        </div>
                        <div className="row">
                            <label className="col-lg-3"> Item Starting Bid </label> 
                            <input
                                className="form-control col-lg-9"
                                type = "number"
                                name = "itemStartingBid"
                                placeholder = "Starting Bid"
                                value = { values.itemStartingBid }
                                onChange = { handleOnChange }
                            />
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-3 rm-padding">
                        <div className="col-lg-12 full-width rm-padding">
                            <button 
                                type = 'submit'
                                className = 'btn btn-primary btn-full'
                                onClick={ handleOnClick }
                            >Add Item
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
            :
            <div>
                <div className="row">
                    <div className="col-md-12 col-lg-9">
                        <div className="row">
                            <label className="col-lg-3"> Select Item </label> 
                            <select 
                                value = { values.item }
                                name = "item"
                                onChange = { handleOnChange }
                                className = 'form-control col-lg-9' 
                            >
                                <option value = "" > Select an Item </option> 
                                {props.items.map((item) => {
                                    return (!item.ended &&
                                        <option 
                                            key = { item.id }
                                            value = { item.id }
                                        >{ item.name }
                                        </option>
                                    )
                                })} 
                            </select> 
                        </div>
                        <div className="row">
                            <label className="col-lg-3"> Bid </label> 
                            <input
                                className="form-control col-lg-9"
                                type = "number"
                                name = "bid"
                                placeholder = "Place your Bid here"
                                value = { values.bid }
                                onChange = { handleOnChange }
                            />
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-3 rm-padding">
                        <div className = "col-lg-12 full-width rm-padding">
                            <button 
                                type='submit'
                                className = 'btn btn-primary btn-full'
                            > Bid 
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-lg-12 rm-padding">
                        <div className="col-lg-12 full-width rm-padding">
                            <button 
                                type='button'
                                className = 'btn btn-primary'
                                onClick={ handleOnClick }
                            > Withdraw
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        }
        
    </form>
    )
}
export default memo(Form);