<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="text" encoding="UTF-8" indent="yes"/>
<xsl:strip-space elements="*"/>
<xsl:template match="/">
    <xsl:for-each select="//*[starts-with(name(), 'DIV')]">
      {
        "put":"id:ecfr:ecfr::<xsl:value-of select="translate(translate(@NODE,':','__'),'.','_')"/>",
        "fields": {
            "path":"<xsl:value-of select="@NODE"/>",
            "div":"<xsl:value-of select="name()"/>",
            "n":"<xsl:value-of select="@N"/>",
            "doctype":"<xsl:value-of select="@TYPE"/>",
            "head":"<xsl:value-of select="normalize-space(HEAD)"/>",
            "parent":"<xsl:value-of select="ancestor::node()[1]/@NODE"/>",
            "parentn":"<xsl:value-of select="ancestor::node()[1]/@N"/>",
            "tag":[
            <xsl:for-each select="P/I">
                "<xsl:value-of select="text()"/>"
                <xsl:if test="position() != last()">
                    <xsl:text>,</xsl:text>
                </xsl:if>
            </xsl:for-each>
            ],
            "p":[
            <xsl:for-each select="P">
                "<xsl:value-of select="normalize-space(.)"/>"
                <xsl:if test="position() != last()">
                    <xsl:text>,</xsl:text>
                </xsl:if>
            </xsl:for-each>
            ],
            "parenth":"<xsl:value-of select="normalize-space(../*[starts-with(name(), 'DIV')]/HEAD)"/>"
        }
      }
        <xsl:if test="position() != last()">
            <xsl:text>😀</xsl:text>
        </xsl:if>
    </xsl:for-each>
</xsl:template>

</xsl:stylesheet>

<!--
<DIV1 N="1" NODE="3:1" TYPE="TITLE">
    <DIV2 N="Subtitle A" NODE="2:1.1" TYPE="SUBTITLE">
        <DIV3 N="I" NODE="3:1.0.1" TYPE="CHAPTER">
            <DIV4 N="B" NODE="48:7.0.10.26" TYPE="SUBCHAP">
                <DIV5 N="100" NODE="3:1.0.1.1.1" TYPE="PART">
                    <DIV6 N="F" NODE="7:15.1.19.2.1.6" TYPE="SUBPART">
                        <DIV7 N="233" NODE="43:2.1.1.6.110.5.233" TYPE="SUBJGRP">
                            <DIV8 N="§ 100.1" NODE="3:1.0.1.1.1.0.1.1" TYPE="SECTION">  
                                <DIV9 N="Appendix I" NODE="4:1.0.1.5.20.0.17.22.1" TYPE="APPENDIX">
-->

<!--
{
    "put": "id:music:music::123",
    "fields": {
        "title": "Best of Bob Dylan"
    }
}
-->
