import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const renderWithRouter = (component) => {
  const mockHistory = createMemoryHistory();
  return { ...render(
    <Router history={ mockHistory }>
      { component }
    </Router>,
  ),
  history: mockHistory };
};
<<<<<<< HEAD
=======

>>>>>>> aab90121ee155f2e58066ba46c48667897c617a2
export default renderWithRouter;
