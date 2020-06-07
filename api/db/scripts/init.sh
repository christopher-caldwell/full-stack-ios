#!/bin/sh

yarn start:db &

yarn create-table

yarn seed-db