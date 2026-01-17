interface UserData {
  name: string;
}

interface BusinessInsight {
  plainExplanation: string;
  quantifiedRevenueLoss: string;
  nonTechnicalSteps: string[];
}

interface AuditData {
  leakingRevenue?: number;
  activeUsers?: number;
  conversions?: number;
  sessions?: number;
  topCulprit?: string;
  recoveryPotential?: string;
  insightText?: string;
  businessInsights?: BusinessInsight;
}

export async function generateAuditPDF(
  userData: UserData,
  auditData: AuditData,
  isPaid: boolean
): Promise<void> {
  // Ensure we're in the browser
  if (typeof window === 'undefined') {
    console.error("generateAuditPDF can only be called on the client side");
    return;
  }

  console.log("PDF Triggered");

  try {
    // Dynamic import to prevent server-side execution
    // jspdf-autotable v5+ exports autoTable as a function, not as a prototype extension
    const jsPDFModule: any = await import("jspdf");
    const { jsPDF } = jsPDFModule;
    const autoTable = (await import("jspdf-autotable")).default;
    
    // Initialize PDF document
    const doc = new jsPDF();
    
    // Set up colors
    const primaryColor: [number, number, number] = [52, 152, 219]; // Blue
    const accentColor: [number, number, number] = [231, 76, 60]; // Red for revenue leak
    const textColor: [number, number, number] = [44, 62, 80]; // Dark gray
    
    let yPosition = 20;
    
    // HEADER
    doc.setFontSize(24);
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("The Insight Engine", 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(14);
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "normal");
    doc.text("AI Audit Report", 20, yPosition);
    
    yPosition += 5;
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text("Powered by Vera Labs", 20, yPosition);
    
    // SUBHEADER
    yPosition += 15;
    doc.setFontSize(11);
    doc.setTextColor(128, 128, 128);
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(`Prepared for: ${userData.name} | Date: ${currentDate}`, 20, yPosition);
    
    yPosition += 20;
    
    // SECTION 1: Executive Summary
    doc.setFontSize(16);
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "bold");
    doc.text("Executive Summary", 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(11);
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "normal");
    
    // Format the insight text (remove "AI Insight:" prefix if present)
    const summaryText = auditData.insightText 
      ? auditData.insightText.replace(/^AI Insight:\s*/i, "")
      : "Our analysis has identified significant revenue leakage opportunities in your analytics data.";
    
    // Split text into multiple lines if needed
    const maxWidth = 170;
  const summaryLines = doc.splitTextToSize(summaryText, maxWidth);
  doc.text(summaryLines, 20, yPosition);
  yPosition += summaryLines.length * 6 + 10;

  // If not paid, add a lock notice in Executive Summary
  if (!isPaid) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(200, 120, 20); // Amber tone
    const lockSummary = doc.splitTextToSize(
      "[LOCKED] Detailed technical diagnosis and remediation steps are hidden on the free plan.",
      maxWidth
    );
    doc.text(lockSummary, 20, yPosition);
    yPosition += lockSummary.length * 6 + 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
  }
  
  yPosition += 5;
    
    // Revenue leak highlight
    if (auditData.leakingRevenue) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...accentColor);
      doc.text(`Identified Revenue Leak: $${auditData.leakingRevenue.toLocaleString()}/month`, 20, yPosition);
      yPosition += 10;
      
      if (auditData.topCulprit) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...textColor);
        doc.text(`Primary Issue: ${auditData.topCulprit}`, 20, yPosition);
        yPosition += 8;
      }
      
      if (auditData.recoveryPotential) {
        doc.setFontSize(10);
        doc.setTextColor(46, 204, 113); // Green
        doc.text(`Recovery Potential: ${auditData.recoveryPotential}`, 20, yPosition);
        yPosition += 15;
      }
    }
    
    // SECTION 2: Conversion Metrics
    yPosition += 5;
    doc.setFontSize(16);
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "bold");
    doc.text("Conversion Metrics", 20, yPosition);
    
    yPosition += 10;
    
    // Create table data
    const tableData = [
      [
        "Active Users",
        auditData.activeUsers?.toLocaleString() || "N/A",
      ],
      [
        "Sessions",
        auditData.sessions?.toLocaleString() || "N/A",
      ],
      [
        "Conversions",
        auditData.conversions?.toLocaleString() || "N/A",
      ],
      [
        "Conversion Rate",
        auditData.activeUsers && auditData.conversions
          ? `${((auditData.conversions / auditData.activeUsers) * 100).toFixed(2)}%`
          : "N/A",
      ],
    ];
    
    // Add revenue leak row if available
    if (auditData.leakingRevenue) {
      tableData.push([
        "Estimated Monthly Revenue Leak",
        `$${auditData.leakingRevenue.toLocaleString()}`,
      ]);
    }
    
    // Generate table using autoTable (v5+ API: autoTable is a function, not a method)
    autoTable(doc, {
      startY: yPosition,
      head: [["Metric", "Value"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: textColor,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { left: 20, right: 20 },
    });
    
    // Get the final Y position after the table
    const finalY = (doc as any).lastAutoTable.finalY;
    yPosition = finalY + 20;
    
    // SECTION 3: Recommended Actions
    doc.setFontSize(16);
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "bold");
  doc.text("Recommended Actions", 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
  if (!isPaid) {
    // Technical fixes restricted message
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(150, 0, 0); // Red for urgency
    doc.text("TECHNICAL FIXES RESTRICTED", 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("To access the full code fixes and implementation guide,", 20, yPosition);
    yPosition += 7;
    doc.text("please complete the invoice for Vera Labs.", 20, yPosition);
    yPosition += 15;

    // Pay Now CTA
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129); // Emerald Green #10b981
    const ctaText = "Unlock the Full Action Plan & Technical Fixes";
    doc.text(ctaText, 20, yPosition);
    yPosition += 10;
    
    // Box for secure payment
    const boxX = 18;
    const boxY = yPosition - 10;
    const boxWidth = 100;
    const boxHeight = 12;
    
    // Draw emerald green box
    doc.setDrawColor(16, 185, 129); // Emerald Green
    doc.setLineWidth(1);
    doc.rect(boxX, boxY, boxWidth, boxHeight);
    
    // Add "SECURE PAYMENT VIA MOBILE MONEY" text inside the box
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(16, 185, 129); // Emerald Green
    doc.text("SECURE PAYMENT VIA MOBILE MONEY", boxX + 2, boxY + 7);
    
    // Add payment link text
    const payLinkText = "CLICK HERE TO PAY 500 GHS & UNLOCK";
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129); // Emerald Green
    doc.text(payLinkText, 20, yPosition + 8);
    
    // Add clickable link covering the box area
    const linkYPosition = boxY;
    doc.link(boxX, linkYPosition, boxWidth, boxHeight + 10, {
      url: "https://paystack.com/pay/assamad-insight-engine" // Replace with actual Paystack link
    });
    
    yPosition += 25;

    // Reset styles
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
  } else {
    // Generate recommended actions based on the data
    const recommendedActions = [
      "Optimize mobile checkout flow to reduce abandonment rates",
      "Review and improve page load performance, especially on mobile devices",
      "Implement conversion tracking improvements to capture all conversion events",
      "Analyze high-intent user behavior patterns to identify friction points",
      "A/B test checkout form optimizations to improve completion rates",
    ];
    
    // Customize based on topCulprit if available
    if (auditData.topCulprit?.toLowerCase().includes("mobile")) {
      recommendedActions[0] = `Priority: Address ${auditData.topCulprit} - This is the primary revenue leak source`;
    }
    
    recommendedActions.forEach((action, index) => {
      doc.text(`• ${action}`, 25, yPosition);
      yPosition += 7;
    });
  }
    
    // SECTION 4: Business Impact (if available)
    if (auditData.businessInsights) {
      yPosition += 15;
      
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(16);
      doc.setTextColor(...textColor);
      doc.setFont("helvetica", "bold");
      doc.text("Business Impact", 20, yPosition);
      
      yPosition += 10;
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      
      // Plain Explanation
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...primaryColor);
      doc.text("What This Means for Your Business:", 20, yPosition);
      
      yPosition += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(...textColor);
      const explanationLines = doc.splitTextToSize(auditData.businessInsights.plainExplanation, maxWidth);
      doc.text(explanationLines, 20, yPosition);
      yPosition += explanationLines.length * 6 + 10;
      
      // Quantified Revenue Loss
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...accentColor);
      doc.text("Financial Impact:", 20, yPosition);
      
      yPosition += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(...textColor);
      const revenueLines = doc.splitTextToSize(auditData.businessInsights.quantifiedRevenueLoss, maxWidth);
      doc.text(revenueLines, 20, yPosition);
      yPosition += revenueLines.length * 6 + 10;
      
      // Non-Technical Steps
      if (isPaid) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(46, 204, 113); // Green
        doc.text("What You Can Do (No Technical Knowledge Required):", 20, yPosition);
        
        yPosition += 8;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(...textColor);
        auditData.businessInsights.nonTechnicalSteps.forEach((step, index) => {
          doc.text(`${index + 1}. ${step}`, 25, yPosition);
          const stepLines = doc.splitTextToSize(step, maxWidth - 10);
          yPosition += stepLines.length * 6 + 5;
        });
      } else {
        // Locked placeholder for unpaid users
        doc.setFont("helvetica", "italic");
        doc.setFontSize(11);
        doc.setTextColor(150, 150, 150); // Light grey
        const lockedText = doc.splitTextToSize(
          "[Locked] Upgrade to see the non-technical Action Plan.",
          maxWidth
        );
        doc.text(lockedText, 20, yPosition);
        yPosition += lockedText.length * 6 + 10;
        
        // Pay Now CTA for Business Impact section
        yPosition += 5;
        
        // Box for secure payment
        const boxX2 = 18;
        const boxY2 = yPosition - 8;
        const boxWidth2 = 100;
        const boxHeight2 = 12;
        
        // Draw emerald green box
        doc.setDrawColor(16, 185, 129); // Emerald Green
        doc.setLineWidth(1);
        doc.rect(boxX2, boxY2, boxWidth2, boxHeight2);
        
        // Add "SECURE PAYMENT VIA MOBILE MONEY" text inside the box
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(16, 185, 129); // Emerald Green
        doc.text("SECURE PAYMENT VIA MOBILE MONEY", boxX2 + 2, boxY2 + 7);
        
        // Add payment link text
        const payLinkText2 = "CLICK HERE TO PAY 500 GHS & UNLOCK";
        doc.setFontSize(12);
        doc.setTextColor(16, 185, 129); // Emerald Green
        doc.text(payLinkText2, 20, yPosition + 8);
        
        // Add clickable link covering the box area
        const linkYPosition2 = boxY2;
        doc.link(boxX2, linkYPosition2, boxWidth2, boxHeight2 + 10, {
          url: "https://paystack.com/pay/assamad-insight-engine" // Replace with actual Paystack link
        });
        
        yPosition += 25;
      }
    }
    
    // Add page number footer
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(128, 128, 128);
      doc.text(
        `Page ${i} of ${totalPages}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }
    
    // Try to save the PDF, with fallback to opening in new window
    try {
      doc.save("Audit_Report.pdf");
      console.log("PDF Saved");
    } catch (error) {
      console.warn("PDF save failed, opening in new window:", error);
      doc.output("dataurlnewwindow");
      console.log("PDF Opened in New Window");
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}
