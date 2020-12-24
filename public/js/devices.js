
var devices = ['Cloud', 'Crypto-router', 'Crypto-router_symbol', 'Disk_array_2D', 'Firewall', 'House', 'Hub', 'IP_PBX', 'IP_PBX_symbol', 'Modem', 'Network', 'Network_adapter', 'Notebook', 'PBX', 'Phone', 'Printer', 'Rack_42', 'Rack_42_with_door', 'Rackmountable_1U_server_2D', 'Rackmountable_1U_server_3D', 'Rackmountable_2U_server_2D', 'Rackmountable_2U_server_3D', 'Rackmountable_3U_server_2D', 'Rackmountable_3U_server_3D', 'Rackmountable_4U_server_2D', 'Rackmountable_4U_server_3D', 'Rackmountable_5U_server_2D', 'Rackmountable_5U_server_3D', 'Router', 'Router_symbol', 'SAN',  'Satellite', 'Satellite_antenna', 'Server', 'Switch', 'UPS', 'UPS_rackmountable_2D', 'UPS_rackmountable_3D', 'Video_terminal', 'Workstation', 'Zabbix_server_2D', 'Zabbix_server_3D'];

var devices_name = ['云', '加密路由', '加密路由符号', '磁盘阵列(2D)', '防火墙', '机房', '集线器', '网络电话交换机', '网络电话交换机符号', '调制解调器', '网络', '网络适配器', '笔记本电脑', '程控交换机', '电话', '打印机', '42U机柜', '42U带门机柜', '1U机架服务器(2D)', '1U机架服务器(3D)', '2U机架服务器(2D)', '2U机架服务器(3D)', '3U机架服务器(2D)', '3U机架服务器(3D)', '4U机架服务器(2D)', '4U机架服务器(3D)', '5U机架服务器(2D)', '5U机架服务器(3D)', '路由器', '路由符号', '存储区域网络', '卫星', '卫星天线', '服务器', '交换机', 'UPS', '机架UPS(2D)', '机架UPS(3D)', '视频显示终端', '工作站', '监控中心服务器(2D)', '监控中心服务器(3D)'];

var devices_img_64 = ['Cloud_(64).png', 'Crypto-router_(64).png', 'Crypto-router_symbol_(64).png', 'Disk_array_2D_(64).png', 'Firewall_(64).png', 'House_(64).png', 'Hub_(64).png', 'IP_PBX_(64).png', 'IP_PBX_symbol_(64).png', 'Modem_(64).png', 'Network_(64).png', 'Network_adapter_(64).png', 'Notebook_(64).png', 'PBX_(64).png', 'Phone_(64).png', 'Printer_(64).png', 'Rack_42_(64).png', 'Rack_42_with_door_(64).png', 'Rackmountable_1U_server_2D_(64).png', 'Rackmountable_1U_server_3D_(64).png', 'Rackmountable_2U_server_2D_(64).png', 'Rackmountable_2U_server_3D_(64).png', 'Rackmountable_3U_server_2D_(64).png', 'Rackmountable_3U_server_3D_(64).png', 'Rackmountable_4U_server_2D_(64).png', 'Rackmountable_4U_server_3D_(64).png', 'Rackmountable_5U_server_2D_(64).png', 'Rackmountable_5U_server_3D_(64).png', 'Router_(64).png','Router_symbol_(64).png', 'SAN_(64).png', 'Satellite_(64).png', 'Satellite_antenna_(64).png', 'Server_(64).png', 'Switch_(64).png', 'UPS_(64).png', 'UPS_rackmountable_2D_(64).png', 'UPS_rackmountable_3D_(64).png', 'Video_terminal_(64).png', 'Workstation_(64).png', 'Zabbix_server_2D_(64).png', 'Zabbix_server_3D_(64).png'];

var devices_size_64 = [[64, 34], [64, 60], [64, 63], [64, 12], [64, 48], [59, 64], [64, 40], [64, 59], [64, 59], [64, 39], [64, 51], [56, 64], [64, 59], [64, 62], [64, 47], [64, 60], [68, 221], [100, 221], [64, 4], [64, 9], [64, 9], [64, 13], [64, 13], [64, 18], [64, 17], [64, 22], [64, 22], [64, 26], [64, 59], [64, 37], [64, 53], [64, 39], [46, 64], [48, 64], [64, 40], [49, 64], [64, 13], [64, 18], [62, 64], [64, 59], [64, 9], [64, 13]];

var positions = ['Cloud', 'House', 'Network', 'SAN',  'Satellite'];

var positions_name = ['云', '机房', '网络', '存储区域网络', '卫星'];

var positions_img_64 = ['Cloud_(64).png', 'House_(64).png', 'Network_(64).png', 'SAN_(64).png', 'Satellite_(64).png'];

var positions_size_64 = [[64, 34], [59, 64], [64, 51], [64, 53], [64, 39]];

var servers = ['Server', 'Rackmountable_1U_server_2D', 'Rackmountable_1U_server_3D', 'Rackmountable_2U_server_2D', 'Rackmountable_2U_server_3D', 'Rackmountable_3U_server_2D', 'Rackmountable_3U_server_3D', 'Rackmountable_4U_server_2D', 'Rackmountable_4U_server_3D', 'Rackmountable_5U_server_2D', 'Rackmountable_5U_server_3D', 'Zabbix_server_2D', 'Zabbix_server_3D'];

var servers_name = ['服务器', '1U机架服务器(2D)', '1U机架服务器(3D)', '2U机架服务器(2D)', '2U机架服务器(3D)', '3U机架服务器(2D)', '3U机架服务器(3D)', '4U机架服务器(2D)', '4U机架服务器(3D)', '5U机架服务器(2D)', '5U机架服务器(3D)', '监控中心服务器(2D)', '监控中心服务器(3D)'];

var servers_img_64 = ['Server_(64).png', 'Rackmountable_1U_server_2D_(64).png', 'Rackmountable_1U_server_3D_(64).png', 'Rackmountable_2U_server_2D_(64).png', 'Rackmountable_2U_server_3D_(64).png', 'Rackmountable_3U_server_2D_(64).png', 'Rackmountable_3U_server_3D_(64).png', 'Rackmountable_4U_server_2D_(64).png', 'Rackmountable_4U_server_3D_(64).png', 'Rackmountable_5U_server_2D_(64).png', 'Rackmountable_5U_server_3D_(64).png', 'Zabbix_server_2D_(64).png', 'Zabbix_server_3D_(64).png'];

var servers_size_64 = [[48, 64], [64, 4], [64, 9], [64, 9], [64, 13], [64, 13], [64, 18], [64, 17], [64, 22], [64, 22], [64, 26], [64, 9], [64, 13]];

var nets = ['Crypto-router', 'Disk_array_2D', 'Firewall', 'Hub', 'IP_PBX', 'Modem', 'PBX', 'Router', 'Satellite_antenna', 'Switch', 'UPS', 'UPS_rackmountable_2D', 'UPS_rackmountable_3D'];

var nets_name = ['加密路由', '磁盘阵列(2D)', '防火墙', '集线器', '网络电话交换机', '调制解调器', '程控交换机', '路由器', '卫星天线', '交换机', 'UPS', '机架UPS(2D)', '机架UPS(3D)'];

var nets_img_64 = ['Crypto-router_(64).png', 'Disk_array_2D_(64).png', 'Firewall_(64).png', 'Hub_(64).png', 'IP_PBX_(64).png', 'Modem_(64).png', 'PBX_(64).png', 'Router_(64).png', 'Satellite_antenna_(64).png', 'Switch_(64).png', 'UPS_(64).png', 'UPS_rackmountable_2D_(64).png', 'UPS_rackmountable_3D_(64).png'];

var nets_size_64 = [[64, 60], [64, 12], [64, 48], [64, 40], [64, 59], [64, 39], [64, 62], [64, 59], [46, 64], [64, 40], [49, 64], [64, 13], [64, 18]];

var terminals = ['Notebook', 'Phone', 'Printer', 'Video_terminal', 'Workstation'];

var terminals_name = ['笔记本电脑', '电话', '打印机', '视频显示终端', '工作站'];

var terminals_img_64 = ['Notebook_(64).png', 'Phone_(64).png', 'Printer_(64).png', 'Video_terminal_(64).png', 'Workstation_(64).png'];

var terminals_size_64 = [[64, 59], [64, 47], [64, 60], [62, 64], [64, 59]];