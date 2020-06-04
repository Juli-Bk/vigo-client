import React from 'react';
import { render } from '@testing-library/react';
import TabPanel from '../TabPanel';

describe('tab panel testing', () => {
  const testData = <div data-testid='testDiv'>TestDiv</div>;

  it('tab panel renders it`s children', () => {
    const panel = render(<TabPanel children={testData} index={0} value={0}/>);
    const testDiv = panel.getByTestId('testDiv');
    expect(testDiv).toBeInTheDocument();
  });

  it('tab panel has proper id when screen width is xs', () => {
    const panel = render(<TabPanel width='xs' children={testData} index={0} value={0}/>);
    const innerDiv = panel.getByRole('tabpanel');
    expect(innerDiv.id).toEqual('vertical-tabpanel-0');
  });
});