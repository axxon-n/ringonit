TAG = 0.0.1

define ReadJson
$(shell cat ./Payload.json)
endef

LAMBDA_NAME ?= ringonit_signout
LAMBDA_ROLE ?= ringonit_lambda_role
LAMBDA_PAYLOAD ?= $(call ReadJson)

AWS_ACCOUNT ?= 617310043012

build: 
	cargo lambda build --release

run:
	cargo lambda invoke --remote --data-ascii '$(LAMBDA_PAYLOAD)' --output-format json $(LAMBDA_NAME) | jq

check:
	cargo check

test:
	cargo test -- --nocapture

deploy:
	cargo lambda deploy --iam-role arn:aws:iam::$(AWS_ACCOUNT):role/$(LAMBDA_ROLE) 