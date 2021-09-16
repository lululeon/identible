# initialise tf @ a consistent version
Using docker has the advantages:
- users of project don't have to install tf themselves
- devs can have multiple versions of tf kicking about, but project needs to pin tf version down.

So:
- `aws-vault exec <user>`
- `docker-compose -f deploy/docker-compose.yml run --rm terraform init` etc.

Or running with local terraform
`terraform -chdir=deploy init`
`terraform -chdir=deploy fmt`
`terraform -chdir=deploy validate`
`terraform -chdir=deploy plan`
`terraform -chdir=deploy apply`
`terraform -chdir=deploy destroy`