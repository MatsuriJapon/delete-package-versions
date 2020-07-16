export interface InputParams {
  packageVersionIds?: string[]
  ignoredVersions?: RegExp
  owner?: string
  repo?: string
  packageName?: string
  numOldVersionsToDelete?: number
  searchRange?: number
  token?: string
  dryRun?: boolean
}

const defaultParams = {
  packageVersionIds: [],
  ignoredVersions: new RegExp('^(?!.*)$'),
  owner: '',
  repo: '',
  packageName: '',
  numOldVersionsToDelete: 0,
  searchRange: 0,
  token: '',
  dryRun: false
}

export class Input {
  packageVersionIds: string[]
  ignoredVersions: RegExp
  owner: string
  repo: string
  packageName: string
  numOldVersionsToDelete: number
  searchRange: number
  token: string
  dryRun: boolean

  constructor(params?: InputParams) {
    const validatedParams: Required<InputParams> = {...defaultParams, ...params}

    this.packageVersionIds = validatedParams.packageVersionIds
    this.ignoredVersions = validatedParams.ignoredVersions
    this.owner = validatedParams.owner
    this.repo = validatedParams.repo
    this.packageName = validatedParams.packageName
    this.numOldVersionsToDelete = validatedParams.numOldVersionsToDelete
    this.searchRange =
      validatedParams.searchRange === 0
        ? validatedParams.numOldVersionsToDelete
        : validatedParams.searchRange
    this.token = validatedParams.token
    this.dryRun = validatedParams.dryRun
  }

  hasOldestVersionQueryInfo(): boolean {
    return !!(
      this.owner &&
      this.repo &&
      this.packageName &&
      this.numOldVersionsToDelete > 0 &&
      this.token
    )
  }
}
