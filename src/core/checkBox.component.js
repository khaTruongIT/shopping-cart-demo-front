import React, {useState, useEffect}  from 'react' ;
import Layout from "./layout.component";

const Checkbox = (({categories, handleFilters}) => {

    const [checked, setChecked] = useState([]);
    
    const handleToggle = category => () => {
        const currentCategoryId = checked.indexOf(category)
        const newCheckedCategoryId = [...checked];
        // nếu currentCategoryId ko nằm trong checked state 
        if(currentCategoryId === -1) {
            //push category id vào 
            newCheckedCategoryId.push(category);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    }

    return categories.map((category, index) => (
        <li key={index} className='list-unstyled'>
            <input onChange={handleToggle(category._id)}  value={checked.indexOf(category._id === -1)} type='checkbox' className='form-check-input'/>
            <label className='form-check-label'> {category.name} </label>
        </li>
    ))
})

export default Checkbox;