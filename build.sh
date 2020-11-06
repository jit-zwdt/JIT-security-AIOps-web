imagesid=`docker images | grep -i jit/jitaiops-web | awk '{print $3}'| head -1`
project=/var/lib/jenkins/workspace/JIT-security-AIOps-web
IMAGENAME=jit/jitaiops-web
HARBORURI=www.harbor.mobi
HARBORREPONAME=harbor
if [ -z "$VERSION" ];then
	VERSION=`date +%Y%m%d%H%M`
fi

echo $VERSION

if docker ps -a|grep -i jit-aiops-web;then
   docker rm -f jit-aiops-web
fi

if [ -z "$imagesid" ];then
	echo $imagesid "is null"
else
	docker rmi -f $imagesid 
fi

docker build -t $IMAGENAME:$VERSION $project

docker run -p 8080:80 -idt --name jit-aiops-web --network zabbix_net     $IMAGENAME:$VERSION


docker tag $IMAGENAME:$VERSION $HARBORURI/$HARBORREPONAME/$IMAGENAME:$VERSION
docker login -u ggzw -p Dotacsjit3368 $HARBORURI
docker push $HARBORURI/$HARBORREPONAME/$IMAGENAME:$VERSION
docker rmi $HARBORURI/$HARBORREPONAME/$IMAGENAME:$VERSION