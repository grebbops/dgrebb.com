export TF_VAR_aws_access_key=$(pass dg/aws/id)
export TF_VAR_aws_secret_key=$(pass dg/aws/secret)
export TF_VAR_region=$(pass dg/aws/region)
export TF_VAR_tf_state_region=$(pass dg/aws/region)
export TF_VAR_basedomain=$(pass dg/basedomain)
export TF_VAR_domain=$(pass dg/www/domain)
export TF_VAR_cmsdomain=$(pass dg/cms/domain)
export TF_VAR_cdndomain=$(pass dg/www/cdndomain)
export TF_VAR_dashed_domain=$(pass dg/www/dashed-domain)
export TF_VAR_dashed_cmsdomain=$(pass dg/cms/dashed-domain)
export TF_VAR_dashed_cdndomain=$(pass dg/www/dashed-cdndomain)
export TF_VAR_db_password=$(pass dg/cms/db/password)
export TF_VAR_deployed_at=$(date +%s)