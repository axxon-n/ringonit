push:
	git add .
	git commit -m "$(shell read -p "Enter Commit Message: " enter ; echo $${enter})"
	git push -u origin main
