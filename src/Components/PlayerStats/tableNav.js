import React from 'react';
import { Pagination } from '@material-ui/lab';

function TableNav({ pages, changePage }) {
  return (
      <Pagination
        color='primary'
        count={pages}
        size='large'
        showFirstButton
        showLastButton
        onChange={changePage}
        style={{textAlign: 'right'}}
      />
  )
}

export default TableNav;
