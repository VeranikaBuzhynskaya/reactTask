import React from 'react';
import Header from '../Header/Header';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';
import './firstPage.css';

class FirstPage extends React.Component{
    render(){
        return (
            <div className="wrapper">
                <Header/>
                <Content/>
                <Footer/>
            </div>
        );
    }
}

export default FirstPage;
