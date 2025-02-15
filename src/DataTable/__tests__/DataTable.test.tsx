import userEvent from '@testing-library/user-event'
import {render, screen, getByRole, queryByRole, queryAllByRole} from '@testing-library/react'
import React from 'react'
import {DataTable, TableContainer, TableTitle, TableSubtitle} from '..'
import {createColumnHelper} from '../column'

describe('DataTable', () => {
  it('should render a semantic <table> through `data` and `columns`', () => {
    const columnHelper = createColumnHelper<{id: number; name: string}>()
    const columns = [
      columnHelper.column({
        header: 'Name',
        field: 'name',
      }),
    ]
    const data = [
      {
        id: 1,
        name: 'one',
      },
      {
        id: 2,
        name: 'two',
      },
      {
        id: 3,
        name: 'three',
      },
    ]
    render(<DataTable data={data} columns={columns} />)

    // <table>
    expect(screen.getByRole('table')).toBeInTheDocument()

    // <th>
    expect(screen.getAllByRole('columnheader')).toHaveLength(1)
    expect(screen.getByRole('columnheader', {name: 'Name'})).toBeInTheDocument()

    // <tr>
    expect(screen.getAllByRole('row').length).toBe(4)
    // <td>
    expect(screen.getAllByRole('cell').length).toBe(3)
  })

  it('should support custom cell rendering with `renderCell`', () => {
    const data = [
      {
        id: 1,
        name: {
          value: 'one',
        },
      },
      {
        id: 2,
        name: {
          value: 'two',
        },
      },
      {
        id: 3,
        name: {
          value: 'three',
        },
      },
    ]
    render(
      <DataTable
        data={data}
        columns={[
          {
            header: 'Name',
            field: 'name.value',
            renderCell: row => {
              return row.name.value
            },
          },
        ]}
      />,
    )

    for (const row of data) {
      expect(screen.getByRole('cell', {name: row.name.value})).toBeInTheDocument()
    }
  })

  it('should support custom labeling through `aria-labelledby`', () => {
    const columnHelper = createColumnHelper<{id: number; name: string}>()
    const columns = [
      columnHelper.column({
        header: 'Name',
        field: 'name',
      }),
    ]
    const data = [
      {
        id: 1,
        name: 'one',
      },
      {
        id: 2,
        name: 'two',
      },
      {
        id: 3,
        name: 'three',
      },
    ]
    render(
      <>
        <h2 id="custom-title">custom-title</h2>
        <DataTable data={data} columns={columns} aria-labelledby="custom-title" />
      </>,
    )
    expect(screen.getByRole('table', {name: 'custom-title'})).toBeInTheDocument()
  })

  it('should support custom labeling through `aria-labelledby` and `TableTitle`', () => {
    const columnHelper = createColumnHelper<{id: number; name: string}>()
    const columns = [
      columnHelper.column({
        header: 'Name',
        field: 'name',
      }),
    ]
    const data = [
      {
        id: 1,
        name: 'one',
      },
      {
        id: 2,
        name: 'two',
      },
      {
        id: 3,
        name: 'three',
      },
    ]
    render(
      <TableContainer>
        <TableTitle as="h2" id="custom-title">
          custom-title
        </TableTitle>
        <DataTable data={data} columns={columns} aria-labelledby="custom-title" />
      </TableContainer>,
    )
    expect(screen.getByRole('table', {name: 'custom-title'})).toBeInTheDocument()
  })

  it('should support custom descriptions through `aria-describedby`', () => {
    const columnHelper = createColumnHelper<{id: number; name: string}>()
    const columns = [
      columnHelper.column({
        header: 'Name',
        field: 'name',
      }),
    ]
    const data = [
      {
        id: 1,
        name: 'one',
      },
      {
        id: 2,
        name: 'two',
      },
      {
        id: 3,
        name: 'three',
      },
    ]
    render(
      <>
        <p id="custom-description">custom-description</p>
        <DataTable data={data} columns={columns} aria-describedby="custom-description" />
      </>,
    )
    expect(screen.getByRole('table', {description: 'custom-description'})).toBeInTheDocument()
  })

  it('should support custom descriptions through `aria-describedby` and `TableSubtitle`', () => {
    const columnHelper = createColumnHelper<{id: number; name: string}>()
    const columns = [
      columnHelper.column({
        header: 'Name',
        field: 'name',
      }),
    ]
    const data = [
      {
        id: 1,
        name: 'one',
      },
      {
        id: 2,
        name: 'two',
      },
      {
        id: 3,
        name: 'three',
      },
    ]
    render(
      <TableContainer>
        <TableSubtitle as="p" id="custom-description">
          custom-description
        </TableSubtitle>
        <DataTable data={data} columns={columns} aria-describedby="custom-description" />
      </TableContainer>,
    )
    expect(screen.getByRole('table', {description: 'custom-description'})).toBeInTheDocument()
  })

  it('should support customizing the `cellPadding` of cells', () => {
    const columnHelper = createColumnHelper<{id: number; name: string}>()
    const columns = [
      columnHelper.column({
        header: 'Name',
        field: 'name',
      }),
    ]
    const data = [
      {
        id: 1,
        name: 'one',
      },
      {
        id: 2,
        name: 'two',
      },
      {
        id: 3,
        name: 'three',
      },
    ]
    const {rerender} = render(<DataTable data={data} columns={columns} />)

    expect(screen.getByRole('table')).toHaveAttribute('data-cell-padding', 'normal')

    rerender(<DataTable data={data} columns={columns} cellPadding="condensed" />)
    expect(screen.getByRole('table')).toHaveAttribute('data-cell-padding', 'condensed')

    rerender(<DataTable data={data} columns={columns} cellPadding="spacious" />)
    expect(screen.getByRole('table')).toHaveAttribute('data-cell-padding', 'spacious')
  })

  it('should support specifying a rowHeader through `rowHeader` in `columns`', () => {
    const columnHelper = createColumnHelper<{id: number; name: string}>()
    const columns = [
      columnHelper.column({
        header: 'Name',
        field: 'name',
        rowHeader: true,
      }),
    ]
    const data = [
      {
        id: 1,
        name: 'one',
      },
      {
        id: 2,
        name: 'two',
      },
      {
        id: 3,
        name: 'three',
      },
    ]
    render(<DataTable data={data} columns={columns} />)
    for (const row of data) {
      expect(screen.getByRole('rowheader', {name: row.name})).toBeInTheDocument()
    }
  })

  describe('sorting', () => {
    it('should set the default sort state of a sortable table', () => {
      render(
        <DataTable
          data={[
            {
              id: 1,
              value: 1,
            },
            {
              id: 2,
              value: 2,
            },
            {
              id: 3,
              value: 3,
            },
          ]}
          columns={[
            {
              header: 'Value',
              field: 'value',
              sortBy: true,
            },
          ]}
          initialSortColumn="value"
          initialSortDirection="ASC"
        />,
      )

      const header = screen.getByRole('columnheader', {
        name: 'Value',
      })
      expect(header).toHaveAttribute('aria-sort', 'ascending')

      const rows = screen
        .getAllByRole('row')
        .filter(row => {
          return queryByRole(row, 'cell')
        })
        .map(row => {
          const cell = getByRole(row, 'cell')
          return cell.textContent
        })
      expect(rows).toEqual(['1', '2', '3'])
    })

    it('should set the default sort state of the first sortable column if only `initialSortDirection` is provided', () => {
      render(
        <DataTable
          data={[
            {
              id: 1,
              fieldOne: 'a',
              fieldTwo: 'c',
            },
            {
              id: 2,
              fieldOne: 'b',
              fieldTwo: 'b',
            },
            {
              id: 3,
              fieldOne: 'c',
              fieldTwo: 'a',
            },
          ]}
          columns={[
            {
              header: 'Field One',
              field: 'fieldOne',
            },
            {
              header: 'Field Two',
              field: 'fieldTwo',
              sortBy: true,
            },
          ]}
          initialSortDirection="ASC"
        />,
      )

      const header = screen.getByRole('columnheader', {
        name: 'Field Two',
      })
      expect(header).toHaveAttribute('aria-sort', 'ascending')

      const body = screen.getByRole('table').querySelector('tbody') as HTMLTableSectionElement
      const rows = queryAllByRole(body, 'row').map(row => {
        const cells = queryAllByRole(row, 'cell').map(cell => {
          return cell.textContent
        })
        return cells
      })
      expect(rows).toEqual([
        ['a', 'c'],
        ['b', 'b'],
        ['c', 'a'],
      ])
    })

    it('should not set a default sort state if `initialSortDirection` is provided but no columns are sortable', () => {
      render(
        <DataTable
          data={[
            {
              id: 1,
              fieldOne: 'a',
              fieldTwo: 'c',
            },
            {
              id: 2,
              fieldOne: 'b',
              fieldTwo: 'b',
            },
            {
              id: 3,
              fieldOne: 'c',
              fieldTwo: 'a',
            },
          ]}
          columns={[
            {
              header: 'Field One',
              field: 'fieldOne',
            },
            {
              header: 'Field Two',
              field: 'fieldTwo',
            },
          ]}
          initialSortDirection="ASC"
        />,
      )

      const headers = screen.getAllByRole('columnheader')
      for (const header of headers) {
        expect(header).not.toHaveAttribute('aria-sort')
      }
    })

    it('should change the sort direction on mouse click', async () => {
      const user = userEvent.setup()
      render(
        <DataTable
          data={[
            {
              id: 1,
              value: 1,
            },
            {
              id: 2,
              value: 2,
            },
            {
              id: 3,
              value: 3,
            },
          ]}
          columns={[
            {
              header: 'Value',
              field: 'value',
              sortBy: true,
            },
          ]}
          initialSortColumn="value"
          initialSortDirection="ASC"
        />,
      )

      function getRowOrder() {
        return screen
          .getAllByRole('row')
          .filter(row => {
            return queryByRole(row, 'cell')
          })
          .map(row => {
            const cell = getByRole(row, 'cell')
            return cell.textContent
          })
      }

      expect(getRowOrder()).toEqual(['1', '2', '3'])

      // Transition from ASC -> DESC order
      await user.click(screen.getByText('Value'))
      expect(getRowOrder()).toEqual(['3', '2', '1'])

      // Transition from DESC -> ASC order
      await user.click(screen.getByText('Value'))
      expect(getRowOrder()).toEqual(['1', '2', '3'])
    })

    it('should change the sort direction on keyboard Enter or Space', async () => {
      const user = userEvent.setup()
      render(
        <DataTable
          data={[
            {
              id: 1,
              value: 1,
            },
            {
              id: 2,
              value: 2,
            },
            {
              id: 3,
              value: 3,
            },
          ]}
          columns={[
            {
              header: 'Value',
              field: 'value',
              sortBy: true,
            },
          ]}
          initialSortColumn="value"
          initialSortDirection="ASC"
        />,
      )

      function getRowOrder() {
        return screen
          .getAllByRole('row')
          .filter(row => {
            return queryByRole(row, 'cell')
          })
          .map(row => {
            const cell = getByRole(row, 'cell')
            return cell.textContent
          })
      }

      function getSortHeader() {
        return screen.getByRole('columnheader', {
          name: 'Value',
        })
      }

      expect(getRowOrder()).toEqual(['1', '2', '3'])
      expect(getSortHeader()).toHaveAttribute('aria-sort', 'ascending')

      // Focus columnheader, it should be the first focusable element
      await user.tab()

      // Transition from ASC -> DESC order
      await user.keyboard('{Enter}')
      expect(getRowOrder()).toEqual(['3', '2', '1'])
      expect(getSortHeader()).toHaveAttribute('aria-sort', 'descending')

      // Transition from DESC -> ASC order
      await user.keyboard('{Enter}')
      expect(getRowOrder()).toEqual(['1', '2', '3'])
      expect(getSortHeader()).toHaveAttribute('aria-sort', 'ascending')

      // Transition from ASC -> DESC order
      await user.keyboard(' ')
      expect(getRowOrder()).toEqual(['3', '2', '1'])
      expect(getSortHeader()).toHaveAttribute('aria-sort', 'descending')

      // Transition from DESC -> ASC order
      await user.keyboard(' ')
      expect(getRowOrder()).toEqual(['1', '2', '3'])
      expect(getSortHeader()).toHaveAttribute('aria-sort', 'ascending')
    })

    it('should reset the sort direction when a new column is selected', async () => {
      const user = userEvent.setup()
      render(
        <DataTable
          data={[
            {
              id: 1,
              columnA: 1,
              columnB: 3,
            },
            {
              id: 2,
              columnA: 2,
              columnB: 2,
            },
            {
              id: 3,
              columnA: 3,
              columnB: 1,
            },
          ]}
          columns={[
            {
              header: 'Column A',
              field: 'columnA',
              sortBy: true,
            },
            {
              header: 'Column B',
              field: 'columnB',
              sortBy: true,
            },
          ]}
        />,
      )

      function getRowOrder() {
        return screen
          .getAllByRole('row')
          .filter(row => {
            return queryAllByRole(row, 'cell').length > 0
          })
          .map(row => {
            const cells = queryAllByRole(row, 'cell')
            return [cells[0].textContent, cells[1].textContent].map(value => {
              return parseInt(value as string, 10)
            })
          })
      }

      function getSortHeader(name: string) {
        return screen.getByRole('columnheader', {
          name,
        })
      }

      // Start in an ASC sort order
      expect(getSortHeader('Column A')).toHaveAttribute('aria-sort', 'ascending')
      expect(getRowOrder()).toEqual([
        [1, 3],
        [2, 2],
        [3, 1],
      ])

      // Transition to a DESC sort order
      await user.click(screen.getByText('Column A'))
      expect(getSortHeader('Column A')).toHaveAttribute('aria-sort', 'descending')

      // When interacting with Column B, sort order should reset to ASC
      await user.click(screen.getByText('Column B'))
      expect(getSortHeader('Column A')).not.toHaveAttribute('aria-sort')
      expect(getSortHeader('Column B')).toHaveAttribute('aria-sort', 'ascending')
      expect(getRowOrder()).toEqual([
        [3, 1],
        [2, 2],
        [1, 3],
      ])
    })
  })
})
