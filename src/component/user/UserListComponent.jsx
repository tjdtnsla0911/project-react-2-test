import React, { Component } from 'react';
import ApiService from '../../ApiService';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '../common/pagination';
import { paginate } from '../../utils/paginate';

class UserListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      message: null,
      users: '',
      pageSize: 3,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.reloadUserList();
  }

  reloadUserList = () => {
    ApiService.fetchUsers()
      .then((res) => {
        this.setState({
          users: res.data, //여기 users로 고치면한개도안나옴
        });
        console.log('리스트목록  =', res.data);
      })
      .catch((err) => {
        console.log('reloadUserList() Error!', err);
      });
  };
  // aaa = {
  //   users: this.reloadUserList.users,
  //   pageSize: 3,
  //   currentPage: 1,
  // };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  deleteUser = (userID) => {
    ApiService.deleteUser(userID)
      .then((res) => {
        this.setState({
          message: 'User Deleted Successfully.',
        });
        this.setState({
          users: this.state.users.filter((user) => user.id !== userID),
        });
      })
      .catch((err) => {
        console.log('deleteUser() Error!', err);
      });
  };

  editUser = (ID) => {
    window.localStorage.setItem('userID', ID);
    this.props.history.push('/edit-user');
    console.log('아이디는 = ', ID);
  };

  addUser = () => {
    window.localStorage.removeItem('userID');
    this.props.history.push('/add-user');
  };

  render() {
    // console.log('끝판왕의 목록 = ', this.state.users);

    const { pageSize, currentPage, users: allMovies } = this.state;
    //console.log('스테이터스 = ', this.aaa);
    const { length: count } = this.state.users;
    console.log('카운터 = ', count);

    console.log('콘소레 = ', pageSize);
    const res = paginate(this.state.users, currentPage, pageSize);
    console.log('뮤비쓰 =', res);
    if (count <= 0)
      return (
        <p>
          {' '}
          내용이 한개도없습니다{' '}
          <Button variant="contained" color="primary" onClick={this.addUser}>
            {' '}
            Add User{' '}
          </Button>
        </p>
      );

    return (
      <div>
        <Typography variant="h4" style={style}>
          회원가입자 명단
        </Typography>
        <Button variant="contained" color="primary" onClick={this.addUser}>
          {' '}
          Add User{' '}
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="right">Password</TableCell>
              <TableCell align="right">ROLE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {res.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="user">
                  {user.id}
                </TableCell>
                <TableCell align="right">{user.username}</TableCell>
                <TableCell align="right">{user.password}</TableCell>
                <TableCell align="right">{user.role}</TableCell>
                <TableCell align="right" onClick={() => this.editUser(user.id)}>
                  <CreateIcon />
                </TableCell>

                <TableCell
                  align="right"
                  onClick={() => this.deleteUser(user.id)}
                >
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          pageSize={pageSize}
          itemsCount={count}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

const style = {
  display: 'flex',
  justifyContent: 'center',
};

export default UserListComponent;
