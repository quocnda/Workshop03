import { ethers } from 'ethers'

// Components
import Rating from './Rating'

const Section = ({ title,items_of_sold, items, togglePop,setitem_of_sold_id }) => {
    const settoggleandid = (id) => {
        togglePop(id)
        setitem_of_sold_id(id)
    }
    return (
        <div className='cards__section'>
            <h3 id={title}> {title}</h3>
            <hr/>
            <div className='cards'>
                {items.map((item,index) => (
                    <div className='card' key={index} onClick={() => settoggleandid(index)}>
                        <div className='card__image'>
                            <img src={item.image} alt='Item' />
                        </div>
                        <div className='card__info'> 
                            {item.name}
                            </div>
                    </div>
                ))}
             



            </div>
        </div>
    );
}

export default Section;