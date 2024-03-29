XACML_TEMPLATE = """<?xml version="1.0" encoding="UTF-8"?>
<Policy PolicyId="urn:ndg:security:1.0:authz:test:policy"
    xmlns="urn:oasis:names:tc:xacml:2.0:policy:schema:cd:04"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="urn:oasis:names:tc:xacml:2.0:policy:schema:cd:04 http://docs.oasis-open.org/xacml/access_control-xacml-2.0-policy-schema-cd-04.xsd"
    RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:permit-overrides">
    <Description>
        XACML definition for data space resources. 
    </Description>

    <!--
        The Policy target(s) define which requests apply to the whole policy
    -->
    <Target>
        <Resources>
            <Resource>
                <!-- Pattern match all request URIs beginning with / -->
                <ResourceMatch MatchId="urn:oasis:names:tc:xacml:2.0:function:{dataSetId}">
                    <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#anyURI">^http://localhost/.*$</AttributeValue>
                    <ResourceAttributeDesignator
                        AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
                        DataType="http://www.w3.org/2001/XMLSchema#anyURI"/>
                </ResourceMatch>
            </Resource>
        </Resources>
    </Target>

    <!-- Deny everything by default -->
    <Rule RuleId="DenyAllRule" Effect="Deny"/>
    <!--
        Following rules punch holes through the deny everything rule above
        because the rule combining algorithm is set to permit overrides - see
        Policy element above
    -->
    <Rule RuleId="ResourceBased" Effect="Permit">
        <!--
            Resource based restriction only
        -->
        <Target>
            <Resources>
                <Resource>
                    <!-- Match the request URI -->
                    <ResourceMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:anyURI-equal">
                        <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#anyURI">http://localhost/resource-only-restricted</AttributeValue>
                        <ResourceAttributeDesignator
                            AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
                            DataType="http://www.w3.org/2001/XMLSchema#anyURI"/>
                    </ResourceMatch>
                </Resource>
            </Resources>
        </Target>
    </Rule>

    <Rule RuleId="SingleSubjectRoleBased" Effect="Permit">
        <!--
            Allow access based on a single subject role
        -->
        <Target>
            <Subjects>
                <Subject>
                    <SubjectMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">staff</AttributeValue>
                        <SubjectAttributeDesignator
                            AttributeId="urn:ndg:security:authz:1.0:attr"
                            DataType="http://www.w3.org/2001/XMLSchema#string"/>
                    </SubjectMatch>
                </Subject>
            </Subjects>
            <Resources>
                <Resource>
                    <ResourceMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:anyURI-equal">
                        <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#anyURI">http://localhost/single-subject-role-restricted</AttributeValue>
                        <ResourceAttributeDesignator
                            AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
                            DataType="http://www.w3.org/2001/XMLSchema#anyURI"/>
                    </ResourceMatch>
                </Resource>
            </Resources>
        </Target>
    </Rule>

    <Rule RuleId="SingleSubjectRoleBasedWithAction" Effect="Permit">
        <!--
            Allow access based on a single subject role and given action
        -->
        <Target>
            <Subjects>
                <Subject>
                    <SubjectMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">staff</AttributeValue>
                        <SubjectAttributeDesignator
                            AttributeId="urn:ndg:security:authz:1.0:attr"
                            DataType="http://www.w3.org/2001/XMLSchema#string"/>
                    </SubjectMatch>
                </Subject>
            </Subjects>
            <Resources>
                <Resource>
                    <ResourceMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:anyURI-equal">
                        <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#anyURI">http://localhost/action-and-single-subject-role-restricted</AttributeValue>
                        <ResourceAttributeDesignator
                            AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
                            DataType="http://www.w3.org/2001/XMLSchema#anyURI"/>
                    </ResourceMatch>
                </Resource>
            </Resources>
            <Actions>
                <Action>
                    <ActionMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</AttributeValue>
                        <ActionAttributeDesignator
                            AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id"
                            DataType="http://www.w3.org/2001/XMLSchema#string"/>
                    </ActionMatch>
                </Action>
            </Actions>
        </Target>
    </Rule>

    <Rule RuleId="AtLeastOneSubjectAttributeBased" Effect="Permit">
        <!--
            Subject must have at least one of a group of roles

            Resource id is a regular expression
        -->
        <Target>
            <Resources>
                <Resource>
                    <!-- Pattern match the request URI -->
                    <ResourceMatch MatchId="urn:oasis:names:tc:xacml:2.0:function:anyURI-regexp-match">
                        <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#anyURI">^http://localhost/at-least-of-subject-role-restricted.*$</AttributeValue>
                        <ResourceAttributeDesignator
                            AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
                            DataType="http://www.w3.org/2001/XMLSchema#anyURI"/>
                    </ResourceMatch>
                </Resource>
            </Resources>
        </Target>

        <!--
            The condition narrows down the constraints layed down in the target to
            something more specific

            The user must have at least one of the roles set - in this
            case 'staff'
        -->
        <Condition>
            <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-at-least-one-member-of">
                <SubjectAttributeDesignator
                    AttributeId="urn:ndg:security:authz:1.0:attr"
                    DataType="http://www.w3.org/2001/XMLSchema#string"/>
                <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-bag">
                    <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">staff</AttributeValue>
                    <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">admin</AttributeValue>
                    <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">postdoc</AttributeValue>
                </Apply>
            </Apply>
        </Condition>
    </Rule>
</Policy>"""
