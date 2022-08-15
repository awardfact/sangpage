import './App.css';
import axios from 'axios';
import React , {useEffect, useState , Component} from 'react';
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

//라우터
import { BrowserRouter, Routes, Route } from 'react-router-dom';




const styles = theme =>({
  root : {
    width : '100%',
    marginTop : theme.spacing(3),
    overflowX : 'auto'
  }


})





class App extends Component{


  constructor(props){
    super(props);
    this.state = {
      customers : "", 
      completed : 0
    }
  }

  stateRefresh = () =>{
    this.setState({
      customers : "", 
      completed : 0
    });
    this.callApi().then(res=>{
      this.setState({customers : res})
    }).catch(err=>console.log(err));
  }

  componentDidMount(){
    this.timer = setInterval(this.progress,100);
    this.callApi().then(res=>{
      this.setState({customers : res})
    }).catch(err=>console.log(err));
  }

  callApi = async() =>{
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () =>{

    const {completed}  = this.state;
    this.setState({completed : completed >= 100 ? 0 : completed + 1});
  }


  render(){
    const {classes }  = this.props;
    return (
      <div>
        <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
          {this.state.customers ? this.state.customers.map( c =>{
          return (
        
            <Customer stateRefresh={this.stateRefresh} 
            key={c.id}
            id={c.id}
            image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          );
        }) : 
        <TableRow>
          <TableCell colSpan="6" align="center" >
              <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
          </TableCell>
        </TableRow>
        
        }

          </TableBody>
        </Table>

        </Paper>
        <CustomerAdd  stateRefresh={this.stateRefresh} />
      </div>
      



        
    );
  }



}

export default withStyles(styles)(App);
