.DEFAULT_GOAL := help # when you run make, it defaults to printing available commands

LOCAL_IMAGE_NAME   	= ms-conference-ui
LOCAL_APP_FOLDER  	= application

# Available values: linux/amd64 | linux/arm64/v8
PLATFORM = linux/amd64   

# discover the absolute path to the project repo on the host machine
ifeq ($(OS),Windows_NT)
	DIR := $(shell powershell "(New-Object -ComObject Scripting.FileSystemObject).GetFolder('.').ShortPath")
else
	DIR := "$$(pwd)"
endif

.PHONY: build
build: ## build docker image
	docker build -t $(LOCAL_IMAGE_NAME) --platform $(PLATFORM) .

.PHONY: interactive
interactive: ## get a bash shell in the container
	docker run -it -p 3000:80 --workdir="/$(LOCAL_APP_FOLDER)" \
		$(LOCAL_IMAGE_NAME):latest 


.PHONY: help
help:  ## show all make commands
ifeq ($(OS),Windows_NT)
	powershell "((type Makefile) -match '##') -notmatch 'grep'"
else
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
endif
