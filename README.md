# Clin-R

Application for Clinical Data Management.

## Start

```bash
# prepare
brew install postgresql
brew install node
brew services restart postgresql

# setup
git clone https://github.com/moozeq/clinr.git
cd clinr

# start backend in one console
cd backend
nest start

# start frontend in second console
cd frontend
ng serve
```