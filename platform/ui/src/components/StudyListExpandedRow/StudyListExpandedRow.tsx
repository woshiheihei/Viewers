import React from 'react';
import PropTypes from 'prop-types';
import './StudyListExpandedRow.css';

import Table from '../Table';
import TableHead from '../TableHead';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableCell from '../TableCell';

const StudyListExpandedRow = ({ seriesTableColumns, seriesTableDataSource, children }) => {
  const analysisStatus = seriesTableDataSource.length <= 1 ? 'Analyzing' : 'Analysis Complete';

  return (
    <div className="w-full bg-black py-4 pl-12 pr-2">
      <div className="block">
        {children}
        <div className="mt-2 flex items-center text-sm">
          Analysis Status:{' '}
          <span
            className={`ml-1 flex items-center ${
              analysisStatus === 'Analyzing' ? 'text-yellow-500' : 'text-green-500'
            }`}
          >
            {analysisStatus}
            {analysisStatus === 'Analyzing' && (
              <span className="dots-animation">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            )}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(seriesTableColumns).map(columnKey => {
                return (
                  <TableCell
                    key={columnKey}
                    cellsNum={Object.keys(seriesTableColumns).length}
                  >
                    {seriesTableColumns[columnKey]}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {seriesTableDataSource.map((row, i) => (
              <TableRow key={i}>
                {Object.keys(row).map(cellKey => {
                  const content = row[cellKey];
                  return (
                    <TableCell
                      key={cellKey}
                      className="truncate"
                      cellsNum={Object.keys(row).length}
                    >
                      {content}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

StudyListExpandedRow.propTypes = {
  seriesTableDataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  seriesTableColumns: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default StudyListExpandedRow;
