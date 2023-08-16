import { ethers } from 'ethers'

// Components
import Rating from './Rating'

const Section = ({ title,items_of_sold, items, togglePop }) => {
    return (
        <div className='cards__section'>
            <h3 id={title}> {title}</h3>
            <hr/>
            <div className='cards'>
                {items.map((item,index) => (
                    <div className='card' key={index} onClick={() => togglePop(index)}>
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