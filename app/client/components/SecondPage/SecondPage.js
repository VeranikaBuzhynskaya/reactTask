import React from 'react';
import Header2 from '../Header2/Header2';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';
import '../FirstPage/firstPage.css';

class SecondPage extends React.Component{
    render(){
        return (
            <div className="wrapper">
                <Header2/>
                <Content/>
                <Footer/>
            </div>
        );
    }
}

export default SecondPage;

