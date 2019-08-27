import React, { useState, memo } from 'react'

 const Form = (props) => {
    const [values, setValues] = useState({
        bid: 0,
        item: 0
    });

    const handleOnChange = (event) => {
        const {name, value} = event.target
        setValues({...values, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.owner) {
            props.handleEnd(values.item)
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
        <div className = 'form-group' >
        <label > Select Item </label> 
        <select 
            value = { values.item }
            name = "item"
            onChange = { handleOnChange }
            className = 'form-control' 
        >
            <option value = "" > Select an option </option> 
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
        {props.owner ?
            <div>
                <button 
                    type = 'submit'
                    className = 'btn btn-primary'
                >End Auction
                </button>
                <hr/>
            </div>  : 
            <div>
                <input
                    type = "number"
                    name = "bid"
                    value = { values.bid }
                    onChange = { handleOnChange }
                />
                <button 
                    type='submit'
                    className = 'btn btn-primary'
                > Bid 
                </button>
                <span> | </span>
                <button 
                    type='button'
                    className = 'btn btn-primary'
                    onClick={ handleOnClick }
                > Withdraw
                </button>
                <hr/>
            </div>
        } 
    </form>
    )
}
export default memo(Form);