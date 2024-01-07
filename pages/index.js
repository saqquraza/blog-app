import Head from 'next/head'
import Layout from '../components/Layout'
import Image from 'next/image'

import Link from 'next/link'
// import { db } from '../firebase'
import {db} from '../firebase'
import { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'

export default function Home({ allblogs }) {
  console.log(allblogs);

  // console.log(allblogs)
  // const [blogs, setblogs] = useState(allblogs)
  const [blogs, setblogs] = useState()
  const [end, setEnd] = useState(false)
  const loadMore = async () => {
    const last = blogs[blogs.length - 1]
    const res = await db.collection('blogs')
      .orderBy('createdAt', 'desc')
      .startAfter(new Date(last.createdAt))
      .limit(3)
      .get()
    const newblogs = res.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toMillis(),
        id: docSnap.id
      }
    })
    setblogs(blogs.concat(newblogs))

    if (newblogs.length < 3) {
      setEnd(true)
    }
  }
  useEffect(()=>{
    const fetchBlogs = async () =>{
      const colref = collection(db, 'blogs');
      let arr = [];
      let q = query(colref);
      let snapdoc =await getDocs(q);
      snapdoc.docs.forEach(doc => {
        arr.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setblogs(arr)
    }
    fetchBlogs()
  })
  return (
    <>
      <Layout>
        <div className="hero">
          <div className="mid-inner">
            <h1>Welcome to BeBLOGGER</h1>
            <h5>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, doloribus!</h5>
          </div>
        </div>
        <div className="blog">
          <div className="container">
            <div className="row">
            <div className="col-lg-6 col-md-8 col-12  mx-auto " >
              {
                blogs?.map((val, ind) => {
                  return (
                    <>

                     
                        <div className="card mb-5" key={ind}>
                          <img
                            src={val.imageUrl}
                            alt={val.title}
                            className="bimg"

                          />
                        {/* <Image
                          src={val.imageUrl}
                          alt={val.title}
                          width={100}
                          height={300}
                        /> */}

                          <div className="p-2">
                            <h3>{val.title}</h3>
                            <p>{val.desc}</p>
                            <div className="text-center">
                              <Link href={`/blog/${val.id}`}>Read more</Link>
                            </div>
                          </div>

                        </div>
                      
                    </>
                  )
                })
              }
              </div>
            </div>

            <div className="text-center">
              {
                end ? <h5 className="text-center">No Data</h5>
                  : <button className="btn btn-dark" onClick={loadMore}>Load More</button>
              }
            </div>


          </div>
        </div>

      </Layout>
    </>
  )
}

// export async function getServerSideProps(context) {
//   const colref = collection(db, 'blogs');
//   let arr = [];
//   let q = query(colref);
//   let snapdoc =await getDocs(q);
//   snapdoc.docs.forEach(doc => {
//     arr.push(doc.data());
//     console.log(doc.data());
//   });
// return {
//   props: {
//    arr
//   }
// }
// }