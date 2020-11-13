import React, {useEffect,useState} from 'react'

import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards';
import {Row} from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0) // 현재 페이지

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        
        fetchMovies(endpoint)


    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies([...Movies, ...response.results])
            setMainMovieImage(response.results[0])
            setCurrentPage(response.page) // 페이지 정보
        })
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`;
        
        fetchMovies(endpoint)
    }

    console.log(Movies)
   
    return (
        <div style={{ width:'100%' , margin:'0'}}>
           {/* main image */}
           {MainMovieImage &&   // 이 값이 있으면 렌더링을 해라, 이거 안써주면, 이미지 정보를 가져오기 전에 페이지를 먼저 렌더링하여 오류 발생
            <MainImage 
            
                image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                title={MainMovieImage.original_title}
                text = {MainMovieImage.overview}
                />
            }           
           <div style={{ width:'85%' , margin:'1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr/>

                {/* Movie Grid Cards */}
                <Row gutter={[16,16]}>
                {/* Movies가 있으면 */}
                {Movies && Movies.map((movie,index)=>(
                    <React.Fragment key={index}>

                        <GridCards 
                            LandingPage
                            image ={movie.poster_path ? 
                                `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                            movieId = {movie.id}
                            movieName={movie.original_title}
                            
                        />
                    </React.Fragment>
                ))}
                </Row>
           </div>
           <div style={{ display:'flex' , justifyContent:'center'}}>
                <button onClick={loadMoreItems}>Load More</button>
           </div>
        </div>
    )
}

export default LandingPage
