'use strict'

const fs = require('node:fs')
const path = require('node:path')
const prettier = require('prettier')
const prettierConfig = require('@github/prettier-config')
const recast = require('recast')

const E2E_DIR = path.join(__dirname, '..', 'e2e', 'components')
const components = new Map([
  [
    'ActionList',
    {
      stories: [
        {
          id: 'components-actionlist--default',
          name: 'Default',
        },
        {
          id: 'components-actionlist-features--block-description',
          name: 'Block Description',
        },
        {
          id: 'components-actionlist-features--disabled-item',
          name: 'Disabled Item',
        },
        {
          id: 'components-actionlist-features--inline-description',
          name: 'Inline Description',
        },
        {
          id: 'components-actionlist-features--inside-overlay',
          name: 'Inside Overlay',
        },
        {
          id: 'components-actionlist-features--item-dividers',
          name: 'Item Dividers',
        },
        {
          id: 'components-actionlist-features--links',
          name: 'Links',
        },
        {
          id: 'components-actionlist-features--multi-select',
          name: 'Multi Select',
        },
        {
          id: 'components-actionlist-features--simple-list',
          name: 'Simple List',
        },
        {
          id: 'components-actionlist-features--single-divider',
          name: 'Single Divider',
        },
        {
          id: 'components-actionlist-features--single-select',
          name: 'Single Select',
        },
        {
          id: 'components-actionlist-features--text-wrap-and-truncation',
          name: 'Text Wrap And Truncation',
        },
        {
          id: 'components-actionlist-features--with-avatars',
          name: 'With Avatars',
        },
        {
          id: 'components-actionlist-features--with-icons',
          name: 'With Icons',
        },
      ],
    },
  ],
  [
    'Avatar',
    {
      stories: [
        {
          id: 'components-avatar--default',
          name: 'Default',
        },
        {
          id: 'components-avatar-features--size',
          name: 'Size',
        },
        {
          id: 'components-avatar-features--square',
          name: 'Square',
        },
      ],
    },
  ],
  [
    'AvatarStack',
    {
      stories: [
        {
          id: 'components-avatarstack--default',
          name: 'Default',
        },
        {
          id: 'components-avatarstack--playground',
          name: 'Playground',
        },
        {
          id: 'components-avatarstack-features--align-left',
          name: 'Align Left',
        },
        {
          id: 'components-avatarstack-features--align-right',
          name: 'Align Right',
        },
      ],
    },
  ],
  [
    'AvatarPair',
    {
      stories: [
        {
          id: 'components-avatarpair--default',
          name: 'Default',
        },
        {
          id: 'components-avatarpair-features--parent-circle',
          name: 'Parent Circle',
        },
        {
          id: 'components-avatarpair-features--parent-square',
          name: 'Parent Square',
        },
      ],
    },
  ],
  [
    'BranchName',
    {
      stories: [
        {
          id: 'components-branchname--default',
          name: 'Default',
        },
      ],
    },
  ],
  [
    'Button',
    {
      stories: [
        {
          id: 'components-button--playground',
          name: 'Playground',
        },
        {
          id: 'components-button-features--danger',
          name: 'Danger',
        },
        {
          id: 'components-button--default',
          name: 'Default',
        },
        {
          id: 'components-button-features--disabled',
          name: 'Disabled',
        },
        {
          id: 'components-button-features--invisible',
          name: 'Invisible',
        },
        {
          id: 'components-button-features--large',
          name: 'Large',
        },
        {
          id: 'components-button-features--leading-visual',
          name: 'Leading Visual',
        },
        {
          id: 'components-button-features--medium',
          name: 'Medium',
        },
        {
          id: 'components-button-features--outline',
          name: 'Outline',
        },
        {
          id: 'components-button-features--primary',
          name: 'Primary',
        },
        {
          id: 'components-button-features--small',
          name: 'Small',
        },
        {
          id: 'components-button-features--trailing-counter',
          name: 'Trailing Counter',
        },
        {
          id: 'components-button-features--trailing-visual',
          name: 'Trailing Visual',
        },
      ],
    },
  ],
  [
    'Breadcrumbs',
    {
      stories: [
        {
          id: 'components-breadcrumbs--default',
          name: 'Default',
        },
      ],
    },
  ],
  [
    'CounterLabel',
    {
      stories: [
        {
          id: 'components-counterlabel--default',
          name: 'Default',
        },
        {
          id: 'components-counterlabel-features--primary-theme',
          name: 'Primary Theme',
        },
      ],
    },
  ],
  [
    'Flash',
    {
      stories: [
        {
          id: 'components-flash--default',
          name: 'Default',
        },
        {
          id: 'components-flash-features--danger',
          name: 'Danger',
        },
        {
          id: 'components-flash-features--full',
          name: 'Full',
        },
        {
          id: 'components-flash-features--success',
          name: 'Success',
        },
        {
          id: 'components-flash-features--warning',
          name: 'Warning',
        },
      ],
    },
  ],
  [
    'IconButton',
    {
      stories: [
        {
          id: 'components-iconbutton--playground',
          name: 'Playground',
        },
        {
          id: 'components-iconbutton-features--danger',
          name: 'Danger',
        },
        {
          id: 'components-iconbutton--default',
          name: 'Default',
        },
        {
          id: 'components-iconbutton-features--disabled',
          name: 'Disabled',
        },
        {
          id: 'components-iconbutton-features--invisible',
          name: 'Invisible',
        },
        {
          id: 'components-iconbutton-features--large',
          name: 'Large',
        },
        {
          id: 'components-iconbutton-features--medium',
          name: 'Medium',
        },
        {
          id: 'components-iconbutton-features--primary',
          name: 'Primary',
        },
        {
          id: 'components-iconbutton-features--small',
          name: 'Small',
        },
      ],
    },
  ],
  [
    'Label',
    {
      stories: [
        {
          id: 'components-label--default',
          name: 'Default',
          importPath: './src/Label/Label.stories.tsx',
        },
        {
          id: 'components-label--playground',
          name: 'Playground',
          importPath: './src/Label/Label.stories.tsx',
        },
        {
          id: 'components-label-features--accent',
          name: 'Accent',
        },
        {
          id: 'components-label-features--attention',
          name: 'Attention',
        },
        {
          id: 'components-label-features--danger',
          name: 'Danger',
        },
        {
          id: 'components-label-features--done',
          name: 'Done',
        },
        {
          id: 'components-label-features--primary',
          name: 'Primary',
        },
        {
          id: 'components-label-features--secondary',
          name: 'Secondary',
        },
        {
          id: 'components-label-features--severe',
          name: 'Severe',
        },
        {
          id: 'components-label-features--size-large',
          name: 'Size Large',
        },
        {
          id: 'components-label-features--size-small',
          name: 'Size Small',
        },
        {
          id: 'components-label-features--sponsors',
          name: 'Sponsors',
        },
        {
          id: 'components-label-features--success',
          name: 'Success',
        },
      ],
    },
  ],
  [
    'Link',
    {
      stories: [
        {
          id: 'components-link--default',
          name: 'Default',
        },
        {
          id: 'components-link-features--muted',
          name: 'Muted',
        },
        {
          id: 'components-link-features--underline',
          name: 'Underline',
        },
      ],
    },
  ],
  [
    'LinkButton',
    {
      stories: [
        {
          id: 'components-linkbutton--playground',
          name: 'Playground',
        },
        {
          id: 'components-linkbutton-features--danger',
          name: 'Danger',
        },
        {
          id: 'components-linkbutton--default',
          name: 'Default',
        },
        {
          id: 'components-linkbutton-features--invisible',
          name: 'Invisible',
        },
        {
          id: 'components-linkbutton-features--large',
          name: 'Large',
        },
        {
          id: 'components-linkbutton-features--leading-visual',
          name: 'Leading Visual',
        },
        {
          id: 'components-linkbutton-features--medium',
          name: 'Medium',
        },
        {
          id: 'components-linkbutton-features--outline',
          name: 'Outline',
        },
        {
          id: 'components-linkbutton-features--primary',
          name: 'Primary',
        },
        {
          id: 'components-linkbutton-features--small',
          name: 'Small',
        },
        {
          id: 'components-linkbutton-features--trailing-visual',
          name: 'Trailing Visual',
        },
        {
          id: 'components-linkbutton-features--with-react-router',
          name: 'With React Router',
        },
      ],
    },
  ],
  [
    'RadioGroup',
    {
      stories: [
        {
          id: 'components-forms-radiogroup-examples--default',
          name: 'Default',
        },
      ],
    },
  ],
  [
    'UnderlineNav',
    {
      stories: [
        {
          id: 'drafts-components-underlinenav-examples--profile-page',
          name: 'Profile Page',
        },
        {
          id: 'drafts-components-underlinenav-examples--pull-request-page',
          name: 'Pull Request Page',
        },
        {
          id: 'drafts-components-underlinenav-examples--repos-page',
          name: 'Repos Page',
        },
        {
          id: 'drafts-components-underlinenav-features--counters-loading-state',
          name: 'Counters Loading State',
        },
        {
          id: 'drafts-components-underlinenav-features--default',
          name: 'Default',
        },
        {
          id: 'drafts-components-underlinenav-features--overflow-template',
          name: 'Overflow Template',
        },
        {
          id: 'drafts-components-underlinenav-features--with-counter-labels',
          name: 'With Counter Labels',
        },
        {
          id: 'drafts-components-underlinenav-features--with-icons',
          name: 'With Icons',
        },
      ],
    },
  ],
  [
    'TabNav',
    {
      stories: [
        {
          id: 'components-tabnav--default',
          name: 'Default',
        },
      ],
    },
  ],
  [
    'Timeline',
    {
      stories: [
        {
          id: 'components-timeline--default',
          name: 'Default',
        },
        {
          id: 'components-timeline-features--clip-sidebar',
          name: 'Clip Sidebar',
        },
        {
          id: 'components-timeline-features--condensed-items',
          name: 'Condensed Items',
        },
        {
          id: 'components-timeline-features--timeline-break',
          name: 'Timeline Break',
        },
        {
          id: 'components-timeline-features--with-inline-links',
          name: 'With Inline Links',
        },
      ],
    },
  ],
  [
    'TreeView',
    {
      stories: [
        {
          id: 'components-treeview--default',
          name: 'Default',
        },
        {
          id: 'components-treeview-features--empty-directories',
          name: 'Empty Directories',
        },
        {
          id: 'components-treeview-features--files',
          name: 'Files',
        },
        {
          id: 'components-treeview-features--files-changed',
          name: 'Files Changed',
        },
      ],
    },
  ],
])

for (const [component, info] of components) {
  const filepath = path.join(E2E_DIR, path.format({name: `${component}.test`, ext: '.ts'}))

  if (fs.existsSync(filepath)) {
    continue
  }

  const stories = info.stories.map(story => {
    return `test.describe('${story.name}', () => {
  for (const theme of themes) {
    test.describe(theme, () => {
      test('default @vrt', async ({page}) => {
        await visit(page, {
          id: '${story.id}',
          globals: {
            colorScheme: theme
          }
        })

        // Default state
        expect(await page.screenshot()).toMatchSnapshot(\`${component}.${story.name}.\${theme}.png\`)
      })

      test('axe @aat', async ({page}) => {
        await visit(page, {
          id: '${story.id}',
          globals: {
            colorScheme: theme
          }
        })
        await expect(page).toHaveNoViolations({
          rules: {
            'color-contrast': {
              enabled: theme !== 'dark_dimmed'
            },
          },
        })
      })
    });
  }
})`
  })

  const source = recast.parse(`import {test, expect} from '@playwright/test'
import {visit} from '../test-helpers/storybook'
import {themes} from '../test-helpers/themes'

test.describe('${component}', () => {
  ${stories.join('\n\n')}
})`)

  const {code} = recast.print(source)
  const formatted = prettier.format(code, {
    parser: 'typescript',
    ...prettierConfig,
  })
  fs.writeFileSync(filepath, formatted, 'utf8')
}
