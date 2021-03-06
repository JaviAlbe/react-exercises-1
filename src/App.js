import React from 'react'
import Accordion from "./components/Accordion";
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";

const items = [
    {
        title:'What is React?',
        content:'React is a front end javascript framework'
    },
    {
        title:'Why use React?',
        content:'React is a favourite JS library amongst engineers'
    },    {
        title:'How do you use React?',
        content:'You use react by create and rendering components'
    }
]

const options = [
    {
        label:'The Color Red',
        value:'red',
    },
    {
        label:'The Color Green',
        value:'green',
    },
    {
        label:'The Color Blue',
        value:'blue',
    }
]

export default () => {
    return(
        <div>
            <Dropdown options={options}/>
        </div>
    )
}