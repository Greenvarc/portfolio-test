import React,{useState,useEffect} from 'react'
import {motion} from 'framer-motion'

import './About.scss'
import { images } from '../../constants'

import{urlFor,client} from '../../client'

import {AppWrap,MotionWrap} from '../../wrapper'

function Abaout() {
  // const aboutis=[
  //   {title:'Web Development',description:'I am a good web developper', imgUrl:images.about01},
  //   {title:'Web Design',description:'I am a good web designer', imgUrl:images.about02},
  //   {title:'UI/UX',description:'I am a good Ui/UX developper', imgUrl:images.about03},
  //   {title:'Web Animations',description:'I am good at Web Animations', imgUrl:images.about04}
  // ]

  const [abouts, setAbouts] = useState([])
  //featching data ../.
  useEffect(()=>{
    const query=`*[_type=="abouts"]`
    client.fetch(query)
    .then((data)=>setAbouts(data))
  },[])

  return (
    <>
      <h2 className="head-text">
        I Know That <span>Good Design </span> <br /> means <span>Good Business</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about,index)=>(
          <motion.div
            whileInView={{opacity:1}}
            whileHover={{scale:1.1}}
            transition={{duration:0.5,type:'tween'}}
            className='app__profile-item'
            key={about.title+index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{marginTop:'20px'}}>{about.title}</h2>
            <p className="p-text"  style={{marginTop:'10px'}}>{about.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Abaout,'app__about')
  ,'about'
  ,'app__whitebg'
  )