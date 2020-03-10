import React, { Component } from 'react';
import axios from 'axios';

import Header from "../component/Header";
import Gnb from "../component/Gnb";
import Footer from "../component/Footer";
import WebtoonList from "../component/WebtoonList";

class Main extends Component{

    constructor(props){
        super(props);

        const query = new URLSearchParams(props.location.search);
        const day = query.get('day');

        this.state = {
            day : day || 'mon', //디폴트로 월요일
            webtoonList : [] //초기 리스트는 비어있습니다.
        };
    }

    componentDidMount(){
        this._getList();
    }

    componentDidUpdate(prevProps){
        // 요일 변경시 setState 처리
        const prevQuery = new URLSearchParams(prevProps.location.search);
        const prevDay = prevQuery.get('day');
        
        const query = new URLSearchParams(this.props.location.search);
        const day = query.get('day');

        if( prevDay !== day ){
            this.setState({
                day
            });
        }
    }
    
    _getList(){
        const apiUrl = 'dummy/webtoon_list.json';

        axios.get(apiUrl)
        .then( data => {

            // apiUrl 리스트를 state에 저장
            this.setState({
                webtoonList : data.data.webtoonList 
            })
            console.log(data)
        })
        .catch( error => {
            console.log(error);
        });
    }

    render(){
        return(
            <div>
                <Header/>
                <Gnb day={this.state.day}/>

                { this.state.webtoonList.length > 0 ? (
                    <WebtoonList list={
                        this.state.webtoonList.filter( webtoon => (
                            webtoon.day === this.state.day // 리스트 중 요일에 해당하는 웹툰만 반환
                        ))
                    } />
                ) : (
                    <span>LOADING...</span>
                )}

                <Footer/>                
            </div>
        )
    }
}

export default Main;