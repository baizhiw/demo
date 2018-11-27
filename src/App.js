import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import Modal from 'antd/lib/modal';
import Input from 'antd/lib/input';
import axios from 'axios';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      List:[],
      showList:[],
      listitem:'',
      modalUrl:'',
      visible:false
    }
  }
  componentDidMount(){
    const _this=this; 
    axios.get('http://www.mocky.io/v2/5be3ced42f00006d00d9f13b')
    .then(function (response) {
      console.log(response)
      _this.setState({
       List : response.data.apis,
       showList:response.data.apis,
      });
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  showModal = (url)=>{
    this.setState({
      modalUrl:url ,
      visible:true
    })
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  inputChange = (e)=>{
    // const showList = [];
    // let List = this.state.List;
    // if(e.target.value === ''){
    //   this.setState({
    //     showList : List
    //   })
    // }
    // for(let i = 0 ; i < List.length ; i ++){
    //   if(List[i].tags.indexOf(e.target.value) != -1){
    //     showList.push(List[i]);
    //   }
    // }
    this.setState({
      listitem:e.target.value
    })
  }
  render() {
   
    
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      render(text,record,index){
        return(
          <div key={index} className="sunning">
            <span>{record.description}</span>
            <p>{record.description}</p>
          </div>
            

        )
      }
    }, {
      title: '链接',
      dataIndex: 'humanURL',
      key: 'humanURL',
      render : (text , record)=>{
        return (
          <a href = {text} >{text}</a>
        )
      }
    }, {
      title: 'image',
      dataIndex: 'image',
      key: 'image',
      render : (text)=>{
        return (
          <img src = {text}/>
        )
      }
    }, {
      title: 'tags',
      dataIndex: 'tags',
      key: 'tags',
      render : (text , record)=>{
        return (
          <div>
            {record.tags.map((item)=>{
              console.log(item,this.state.listitem);
              if(item.indexOf(this.state.listitem)!==-1){
                return (<Tag>{item}</Tag>)
              }
            })}
          </div>
        )
      }
    }, {
      title: '属性',
      dataIndex: 'properties',
      key: 'properties',
      render : (text , record)=>{
        return (
          <div>
            {record.properties.map((item)=>{
              return (<Button type="primary" onClick={this.showModal.bind(this,item.url)}>
             {item.type}
            </Button>)
            })}
          </div>
        )
      }
    }];
    return (
      <div className="App">
        <Input placeholder="请输入" onChange = {this.inputChange} />

        <Table dataSource={this.state.showList} columns={columns} />

        <Modal
          visible={this.state.visible}
          title="Title"
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
          ]}
        >
         <a href = {this.state.modalUrl}>{this.state.modalUrl}</a>
        </Modal>
      </div>
    );
  }
}

export default App;
