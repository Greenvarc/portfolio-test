import React,{useState,useEffect}  from 'react'
import {motion} from 'framer-motion'
import {HiChevronLeft,HiChevronRight} from 'react-icons/hi'

import './Testimonials.scss'
import {AppWrap, MotionWrap} from '../../wrapper'
import {urlFor,client} from '../../client'

function Testimonials() {
  const [brands, setBrands] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [currentindex, setCurrentindex] = useState(0)

  const handleClick=(index)=>{
    setCurrentindex(index)
  
  }
  useEffect(()=>{
    const query=`*[_type=="testimonials"]`;
    const brandsQuery=`*[_type=="brands"]`;


    client.fetch(query)
    .then((data)=>{
      setTestimonials(data)
    })

    client.fetch(brandsQuery)
    .then((data)=>{
      setBrands(data)
    })


  },[])

  const test=testimonials[currentindex]
  return (
    <>
      {testimonials.length&&(
        <>
          <div className="app__testimonial-item app__flex">
            <img src={urlFor(test.imgurl)} alt="testimonial" />
            <div className="app__testimonial-content">
              <p className="p-text">{test.feedback}</p>
              <div>
                <h4 className="bold-text">{test.name}</h4>
                <h5 className="p-text">{test.company}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div className="app__flex" onClick={()=>handleClick( currentindex===0?testimonials.length-1:currentindex-1)}>
              <HiChevronLeft/>
            </div>

            <div className="app__flex" onClick={()=>handleClick( currentindex===testimonials.length-1?0:currentindex+1)}>
              <HiChevronRight/>
            </div>
          </div>
        </>
      )}
      <div className="app__testimonials-brands app__flex">
        {brands.map((brand)=>(
          <motion.div
          whileInView={{opacity:[0,1]}}
          transition={{duration:0.5,type:'tween'}}
          key={brand.id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Testimonials,'app__testimonial')
  ,'testimonial'
  ,'app__primarybg'
  )