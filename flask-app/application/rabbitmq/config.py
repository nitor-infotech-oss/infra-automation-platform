PARAMETER_DETAILS = {
    "AWS": {
        "Linux": {
            "type": "Linux",
            "url": "http://10.11.26.219/api/v2/job_templates/47/launch/",
            "params":{
                "extra_vars": {
                    "ticket_id": "1",
                    "ec2_region": "us-east-2",
                    "image_id": "ami-0f7919c33c90f5b58",
                    "tag_name": "Web_Server",
                    "to": "santoshkolekar101@gmail.com",
                    "user_name": "ec2-user"
                }
            }
        },
        "Windows": {
            "type": "Linux",
            "url": "http://10.11.26.219/api/v2/job_templates/47/launch/",
            "params":{
                "extra_vars": {
                    "ec2_region": "us-east-2",
                    "image_id": "ami-0f7919c33c90f5b58",
                    "tag_name": "Web_Server",
                    "to": "santoshkolekar101@gmail.com",
                    "user_name": "ec2-user"
                }
            }
        }
    },
    "On Premise": {
        "Windows": {
            "type": "Onpremises",
            "url": "http://10.11.26.219/api/v2/job_templates/43/launch/",
            "params":{
                "extra_vars": {
                     "vm_name": "windows_server-2012R2",
                     "memory": "4050MB",
                     "to": "santoshkolekar101@gmail.com"
                }
            }
        }
    },
    "Azure": {
        "Linux": {
            "type": "Onpremises",
            "url": "http://10.11.26.219/api/v2/job_templates/34/launch/",
            "params":{
                "extra_vars": {
                    "resource_group": "test_myResourceGroup",
                    "location": "eastus",
                    "vm_net": "test_myVNet",
                    "vm_subnet": "test_mySubnet",
                    "vm_NIC": "test_myNIC",
                    "vm_NSG": "test_myNetworkSecurityGroup",
                    "name": "Centostest",
                    "vm_size": "Standard_DS1_v2",
                    "admin_username": "azureuser",
                    "admin_password": "admin@12345",
                    "offer": "centOS",
                    "publisher": "OpenLogic",
                    "sku": "7.5",
                    "version": "latest",
                    "to": "santoshkolekar101@gmail.com"
                }
            }
        }
    }
}

STORAGE_PARAMETER_DETAILS = {
        "AWS": {
            "type": "AWS",
            "url": "http://10.11.26.219/api/v2/job_templates/59/launch/",
            "params":{
                "extra_vars": {
                    "name": "demobucketansible",
                    "region": "us-east-2"
                }
            }
        },
        "Azure": {
            "type": "Azure",
            "url": "http://10.11.26.219/api/v2/job_templates/57/launch/",
            "params":{
                "extra_vars": {
                    "resource_group": "my-sqldba-demo-01-rg",
                    "location": "eastus"
                }
            }
        }
}
