import React, { Component } from 'react';
import ApiService from '../../ApiService';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class EditUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      role: '',
      id: '',
      // username: '',
      password: '',
      //  role: '',
      message: null,
      //        this.setState({
      //   message: user.username + '님 정보가 수정되었습니다.',
      //});
    };
  }
  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    console.log('지금뭐쳐받니 ', window.localStorage.getItem('userID'));
    ApiService.fetchUserByID(window.localStorage.getItem('userID'))
      .then((res) => {
        let user = res.data;
        this.setState({
          id: user.id,
          username: user.username,
          password: user.password,
          role: user.role,
        });
      })
      .catch((err) => {
        console.log('loadUser() 에러', err);
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  saveUser = (e) => {
    e.preventDefault();
    //여긴 username이없었음
    let user = {
      id: this.state.id,
      password: this.state.password,
    };
    console.log(this.state.id);

    ApiService.editUser(user)
      .then((res) => {
        this.setState({
          message: ' 정보가 수정되었습니다.',
        });
        this.props.history.push('/users');
        //원래는 '/users'였음
      })
      .catch((err) => {
        console.log('saveUser() 에러', err);
      });
  };

  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          유저 정보 변경
        </Typography>
        <form>
          <TextField
            type="text"
            name="username"
            readOnly={true}
            fullWidth
            margin="normal"
            value={this.state.username}
          />

          <TextField
            placeholder="새로운 비밀번호를입력하세요"
            name="password"
            fullWidth
            //margin="password"

            // value={this.state.lastName}
            onChange={this.onChange}
          />

          <Button variant="contained" color="primary" onClick={this.saveUser}>
            저장하기
          </Button>
        </form>
      </div>
    );
  }
}

const style = {
  display: 'flex',
  justifyContent: 'center',
};

export default EditUserComponent;
